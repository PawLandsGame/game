#!/bin/sh
set -eu

config=/usr/share/nginx/html/runtime-config.js
# Read only public settings and serialize them as JavaScript-safe JSON.
{
    printf 'globalThis.__PAWLANDS_CONFIG__ = '
    jq -nca --slurpfile keys /etc/client-runtime-keys.json '
        $keys[0] | map(. as $key | {key: $key, value: env[$key]} | select(.value != null))
        | from_entries
    '
    printf ';\n'
} > "$config"
