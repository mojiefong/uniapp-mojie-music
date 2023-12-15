FROM node:16.20.2-alpine as build
WORKDIR /app
COPY ./ ./
# RUN npm config set registry https://registry.npmmirror.com
RUN npm i -g pnpm && pnpm i && pnpm run build:h5

FROM nginx:1.25.3-alpine
COPY --from=build /app/dist/build/h5 /usr/share/nginx/html
CMD [ `sed -i "s/<html/<html data-base-url="$API_BASE_URL" /" /usr/share/nginx/html/index.html; nginx -g 'daemon off;'` ]
