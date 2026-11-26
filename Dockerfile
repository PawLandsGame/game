FROM node:22-bookworm AS build

WORKDIR /app
ENV PUPPETEER_SKIP_DOWNLOAD=true SKIP_PRERENDER=1
COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .
ARG VITE_AUTH_SERVER_URL
ARG VITE_SPACETIME_WS_URL
ARG VITE_SPACETIME_DATABASE
ARG VITE_KOKORO_BASE_URL
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
