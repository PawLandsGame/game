#!/bin/sh
set -eu

: "${SPACETIMEDB_PUBLISH_TOKEN:?Set the database owner's SpacetimeDB token}"
server_url=${SPACETIMEDB_SERVER_URL:-http://spacetimedb:3000}
database=${SPACETIMEDB_DATABASE:-pawlands}

curl --fail --silent --show-error --max-time 5 --retry 30 --retry-delay 2 \
    --retry-max-time 90 --retry-all-errors --output /dev/null "${server_url%/}/v1/ping"

umask 077
config_dir=$(mktemp -d)
trap 'rm -rf "$config_dir"' EXIT
config_path="$config_dir/cli.toml"

spacetime --config-path "$config_path" login --token "$SPACETIMEDB_PUBLISH_TOKEN"
spacetime --config-path "$config_path" publish --no-config --yes \
    --delete-data=never --server "$server_url" --bin-path /app/pawlands.wasm "$database"
