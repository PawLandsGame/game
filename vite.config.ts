import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'
import runtimeKeys from './scripts/client-runtime-keys.json'
import react from '@vitejs/plugin-react'
import Prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'
import prerenderRoutes from './prerender-routes.json'
import { isDevWatchIgnored, resilientDevWatcher } from './scripts/dev-server-policy';

function serveRuntimeConfig(mode: string): Plugin {
  function middleware(): Connect.NextHandleFunction {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    const settings = Object.fromEntries(runtimeKeys.map(key => [key, env[key]]));
    return (req, res, next) => {
      if (req.url?.split('?')[0] !== '/runtime-config.js') return next();
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(`globalThis.__PAWLANDS_CONFIG__ = ${JSON.stringify(settings)};`);
    };
  }

  return {
    name: 'pawlands-runtime-config',
    configureServer(server) {
      server.middlewares.use(middleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware());
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Base plugins for all modes
  const plugins: any[] = [react(),resilientDevWatcher()];
  
  // Only add prerenderer during production build (skip if SKIP_PRERENDER=1 to avoid statuses module resolution issues)
  const skipPrerender = process.env.SKIP_PRERENDER === '1';
  if (command === 'build' && mode === 'production' && !skipPrerender) {
    plugins.push(
      // Pre-render blog pages and static pages for SEO/LLEO
      Prerender({
        routes: prerenderRoutes.routes,
        renderer: new PuppeteerRenderer({
          // Wait for network to be idle before capturing
          renderAfterDocumentEvent: 'DOMContentLoaded',
          // Wait for React to render
          renderAfterTime: 2000,
          // Puppeteer launch options
          headless: true,
        }),
        // Post-process the rendered HTML
        postProcess(renderedRoute) {
          // Add prerendered indicator for debugging
          renderedRoute.html = renderedRoute.html.replace(
            '</head>',
            '<meta name="prerendered" content="true"></head>'
          );
        },
      })
    );
  }

  return {
    plugins: [...plugins, serveRuntimeConfig(mode)],
    envPrefix: command === 'build' ? [] : 'VITE_',
    resolve: {
      alias: {
        // No alias needed - using spacetimedb package directly
      },
    },
    server: {
      host: '127.0.0.1',
      port: 3009,
      // Rust builds and the local database contain locked, rapidly changing files;
      // neither belongs in the client hot-reload watcher.
      watch: { ignored: isDevWatchIgnored },
      strictPort: true,
      hmr: {
        // Omit clientPort so HMR matches whichever port Vite actually binds (important when port increments).
        host: '127.0.0.1',
      },
    },
    root: '.',
    publicDir: 'public',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          assetFileNames: '[name]-[hash][extname]',
        }
      },
      // Disable asset inlining to prevent base64 data URL strings from bloating JS heap
      // (~20MB of retained strings with 950+ PNG imports when inlined at 4KB threshold)
      assetsInlineLimit: 0,
      // Improve build performance
      target: 'esnext',
      minify: 'esbuild',
    },
    // Optimize dependencies for faster loading
    optimizeDeps: {
      include: [
        '@fortawesome/fontawesome-svg-core', 
        '@fortawesome/react-fontawesome',
        '@fortawesome/free-brands-svg-icons'
      ]
    },
    // Enable experimental features for better performance
    esbuild: {
      // Remove console logs in production for better performance
      // This strips ALL console.* calls and debugger statements from production builds
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    }
  };
})
