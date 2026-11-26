import type runtimeKeys from '../../../scripts/client-runtime-keys.json';

type RuntimeKey = (typeof runtimeKeys)[number];

declare global {
    var __PAWLANDS_CONFIG__: Partial<Record<RuntimeKey, string>> | undefined;
}

export function runtimeSetting(key: RuntimeKey): string | undefined {
    return globalThis.__PAWLANDS_CONFIG__?.[key]?.trim() || undefined;
}
