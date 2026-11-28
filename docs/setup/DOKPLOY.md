# Публикация игрового модуля в Dokploy

Workflow **Publish container images** собирает образы клиента, авторизации и
`spacetimedb-publisher` с одним тегом. Образ публикации содержит скомпилированный
WASM и CLI SpacetimeDB 2.0.1. GitHub Actions проверяет создание и повторное
обновление базы на отдельном тестовом сервере перед отправкой образа в GHCR.

## Настройка существующего Compose

Добавьте в `services` приложения Dokploy:

```yaml
  spacetimedb-publish:
    image: ghcr.io/pawlandsgame/game/spacetimedb-publisher:${IMAGE_TAG:?set IMAGE_TAG}
    restart: "no"
    environment:
      SPACETIMEDB_PUBLISH_TOKEN: ${SPACETIMEDB_PUBLISH_TOKEN:?set the database owner token}
      SPACETIMEDB_DATABASE: ${VITE_SPACETIME_DATABASE:?set the database name}
    depends_on:
      spacetimedb:
        condition: service_started
```

Сервис ждёт ответа от `http://spacetimedb:3000/v1/ping`, публикует модуль и
завершается. В **Preview Compose** проверьте, что оба сервиса подключены к общей
сети Compose. Сохраните существующий том данных базы.

В **Environment** задайте `SPACETIMEDB_PUBLISH_TOKEN`:

- Если база уже создана, используйте токен той же учётной записи или локальной
  идентификации, которая её создала. Команда `spacetime login show --token`
  показывает токен в том окружении CLI, из которого выполнялась публикация.
- Для новой базы войдите через `spacetime login` на своей машине и получите токен
  командой `spacetime login show --token`. Эта учётная запись станет владельцем
  базы при первой публикации.
- Если токен выдан самим standalone-сервером, его действительность зависит от
  пары ключей этого сервера. Сохраните её в постоянном хранилище перед
  пересозданием контейнера. При переносе существующей пары сохраните оба файла
  и настройте их пути через `--jwt-priv-key-path` и `--jwt-pub-key-path`.

Предоставьте учётной записи реестра Dokploy доступ на скачивание пакета
`spacetimedb-publisher` в GHCR.

## Деплой новой версии

Дождитесь успешного прогона **Publish container images**. Укажите его полный SHA
в `IMAGE_TAG` и нажмите **Deploy**. Убедитесь, что `spacetimedb-publish` завершился
с кодом `0`. Публикация использует `--delete-data=never`. Если схема требует ручной
миграции, её причину покажут логи этого сервиса.

Для production PawLands проверьте, что сервер возвращает идентификатор базы:

```sh
curl -fsS https://db.pawlands.online/v1/database/pawlands/identity
```
