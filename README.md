# PawLands

[English](README-EN.md)

PawLands — браузерная многопользовательская игра о выживании котов и кошек в процедурно сгенерированном мире. Собирайте ресурсы, мастерите снаряжение, стройте укрытия и объединяйтесь с другими игроками.

Первую версию PawLands автор разработал с нуля. Её исходники доступны в архиве [PawLands Game Legacy](https://github.com/PawLandsGame/game-legacy). Для текущей версии используется кодовая база [Broth & Bullets](https://github.com/SeloSlav/2d-multiplayer-survival-mmorpg) на React, TypeScript, Rust и SpacetimeDB. Из ранней PawLands перенесены спрайты котов и знак с лапой.

## Игровые системы

- Сетевая синхронизация игроков, команды и чат.
- Голод, жажда, здоровье, инвентарь и экипировка.
- Бой и PvP, добыча ресурсов и крафт.
- Генерация мира, погода, смена дня и ночи, поведение NPC.

Игра использует 2D-рендерер. Первоначальные задания и SOVA отключены в игровом интерфейсе. Сюжет и задания PawLands будут собственными.

## Локальный запуск

Понадобятся Node.js 22 с npm, Rust с целью `wasm32-unknown-unknown` и SpacetimeDB CLI серии 2.0.x.

```bash
git clone https://github.com/PawLandsGame/game.git
cd game
npm ci
```

Запустите службы в отдельных терминалах.

| Служба | Команда из корня репозитория |
| --- | --- |
| OpenAuth | `cd auth-server-openauth && npm ci && npm run dev` |
| SpacetimeDB | `spacetime start` |
| Клиент | `npm run dev` |

Один раз опубликуйте модуль в локальном SpacetimeDB.

```bash
cd server
spacetime publish --no-config --server http://localhost:3000 -p . broth-bullets-local -y
```

Откройте адрес, который выведет Vite. Обычно это `http://localhost:3009`. Имя локальной базы унаследовано и используется клиентом при подключении.

Для развёртывания задайте адреса своих серверов в `.env`. Примеры переменных есть в [.env.example](.env.example).

## Лицензии

Исходный текст Apache License 2.0 и уведомление об исходном проекте доступны в [LICENSE](LICENSE) и [NOTICE](NOTICE). Условия для материалов PawLands и унаследованных ресурсов описаны в [LICENSES.md](LICENSES.md).
