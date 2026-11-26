FROM node:22-bookworm AS build

WORKDIR /app
ENV PUPPETEER_SKIP_DOWNLOAD=true SKIP_PRERENDER=1
COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN apk add --no-cache jq
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY scripts/client-runtime-keys.json /etc/client-runtime-keys.json
COPY --chmod=755 scripts/docker-client-config.sh /docker-entrypoint.d/40-client-config.sh
EXPOSE 8080
