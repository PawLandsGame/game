FROM clockworklabs/spacetime:v2.0.1 AS build

WORKDIR /home/spacetime/build
COPY --chown=spacetime:spacetime server/ server/
COPY --chown=spacetime:spacetime shared/ shared/
RUN spacetime build --module-path server

FROM clockworklabs/spacetime:v2.0.1

COPY --from=build /home/spacetime/build/server/target/wasm32-unknown-unknown/release/vibe_survival_game.wasm /app/pawlands.wasm
COPY --chmod=755 deploy/spacetimedb/publish.sh /app/publish.sh
ENTRYPOINT ["/app/publish.sh"]
