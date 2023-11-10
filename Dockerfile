FROM node:16.20.1-alpine as build
WORKDIR /app
COPY ./ ./
RUN set -x; \
  npm i -g pnpm; \
  pnpm i; \
  pnpm run build:h5

FROM nginx:1.25.3-alpine
COPY --from=build /app/dist/build/h5 /usr/share/nginx/html
