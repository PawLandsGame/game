# PawLands

[Русский](README.md)

PawLands is a browser-based multiplayer survival game about cats in a procedurally generated world. Gather resources, craft equipment, build shelter, and team up with other players.

The creator built the first PawLands from scratch. Its source is archived in [PawLands Game Legacy](https://github.com/PawLandsGame/game-legacy). This version builds on the [Broth & Bullets](https://github.com/SeloSlav/2d-multiplayer-survival-mmorpg) codebase, which uses React, TypeScript, Rust, and SpacetimeDB. The player sprites and paw mark come from the earlier PawLands.

## Game systems

- Multiplayer synchronization, teams, and chat.
- Hunger, thirst, health, inventory, and equipment.
- Combat and PvP, resource gathering, and crafting.
- World generation, weather, the day–night cycle, and NPC behavior.

The game uses the 2D renderer. The original quests and SOVA are disabled in the game interface. PawLands will have its own story and quests.

## Local setup

Install Node.js 22 with npm, Rust with the `wasm32-unknown-unknown` target, and SpacetimeDB CLI 2.0.x.

```bash
git clone https://github.com/PawLandsGame/game.git
cd game
npm ci
```

Start these services in separate terminals.

| Service | Command from the repository root |
| --- | --- |
| OpenAuth | `cd auth-server-openauth && npm ci && npm run dev` |
| SpacetimeDB | `spacetime start` |
| Client | `npm run dev` |

Publish the module to your local SpacetimeDB instance once.

```bash
cd server
spacetime publish --no-config --server http://localhost:3000 -p . broth-bullets-local -y
```

Open the address printed by Vite, usually `http://localhost:3009`. The client uses the inherited database name when connecting locally.

For deployment, configure your server endpoints in `.env` using [.env.example](.env.example).

## Licenses

See [LICENSE](LICENSE) for the original Apache License 2.0 and [NOTICE](NOTICE) for upstream attribution and terms. [LICENSES.md](LICENSES.md) covers PawLands materials and inherited assets.
