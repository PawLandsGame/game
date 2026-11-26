FROM node:22-bookworm AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY *.ts tsconfig.json ./
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY logo_alt.png pawlands-login.webp ./
RUN chown node:node /app
USER node
EXPOSE 4001
CMD ["npm", "start"]
