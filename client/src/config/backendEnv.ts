/**
 * Resolves auth + SpacetimeDB endpoints for the browser client.
 *
 * Explicit PawLands deployment endpoints override the local development defaults.
 */

import { runtimeSetting } from './runtimeConfig';

const LOCAL_AUTH_SERVER_URL = 'http://localhost:4001';

const LOCAL_SPACETIME_WS_URL = 'ws://localhost:3000';

const LOCAL_SPACETIME_DATABASE = 'broth-bullets-local';

function isLocalDevBrowser(): boolean {
    if (typeof window === 'undefined') return false;
    return import.meta.env.DEV || window.location.hostname === 'localhost';
}

export const authServerUrl = runtimeSetting('VITE_AUTH_SERVER_URL') ?? LOCAL_AUTH_SERVER_URL;
export const spacetimeWsUrl = runtimeSetting('VITE_SPACETIME_WS_URL') ?? LOCAL_SPACETIME_WS_URL;
export const spacetimeDatabaseName = runtimeSetting('VITE_SPACETIME_DATABASE') ?? LOCAL_SPACETIME_DATABASE;

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
