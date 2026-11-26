/**
 * Resolves auth + SpacetimeDB endpoints for the browser client.
 *
 * Explicit PawLands deployment endpoints override the local development defaults.
 */

const LOCAL_AUTH_SERVER_URL = 'http://localhost:4001';

const LOCAL_SPACETIME_WS_URL = 'ws://localhost:3000';

const LOCAL_SPACETIME_DATABASE = 'broth-bullets-local';

function isLocalDevBrowser(): boolean {
    if (typeof window === 'undefined') return false;
    return import.meta.env.DEV || window.location.hostname === 'localhost';
}

function trimEnv(value: string | undefined): string | undefined {
    const t = value?.trim();
    return t ? t : undefined;
}

function resolveAuthServerUrl(): string {
    const override = trimEnv(import.meta.env.VITE_AUTH_SERVER_URL);
    if (override) return override;
    return LOCAL_AUTH_SERVER_URL;
}

function resolveSpacetimeWsUrl(): string {
    const override = trimEnv(import.meta.env.VITE_SPACETIME_WS_URL);
    if (override) return override;
    return LOCAL_SPACETIME_WS_URL;
}

function resolveSpacetimeDatabaseName(): string {
    const override = trimEnv(import.meta.env.VITE_SPACETIME_DATABASE);
    if (override) return override;
    return LOCAL_SPACETIME_DATABASE;
}

export const authServerUrl = resolveAuthServerUrl();
export const spacetimeWsUrl = resolveSpacetimeWsUrl();
export const spacetimeDatabaseName = resolveSpacetimeDatabaseName();

function isLoopbackSpacetimeUrl(value: string): boolean {
    try {
        const url = new URL(value);
        return (url.protocol === 'ws:' || url.protocol === 'wss:') &&
            (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
    } catch {
        return false;
    }
}

/** True when connecting to a local SpacetimeDB process (short connection timeout). */
export const useLocalSpacetimeSocket = isLoopbackSpacetimeUrl(spacetimeWsUrl);

/** Localhost + dev server using production backends via env flag. */
export const usedProductionBackendsFromEnv =
    isLocalDevBrowser() && (authServerUrl !== LOCAL_AUTH_SERVER_URL || !useLocalSpacetimeSocket);

export function getAuthBackendLogLabel(): string {
    const tier = authServerUrl === LOCAL_AUTH_SERVER_URL ? 'local' : 'production';
    if (usedProductionBackendsFromEnv && tier === 'production') {
        return `${tier} (env override)`;
    }
    return tier;
}

export function getSpacetimeBackendLogLabel(): string {
    const tier = useLocalSpacetimeSocket ? 'local' : 'production';
    if (usedProductionBackendsFromEnv && tier === 'production') {
        return `${tier} (env override)`;
    }
    return tier;
}
