FROM node:12-alpine AS build

WORKDIR /build
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./.postcssrc ./
COPY ./src/ ./src/
RUN npm run build

FROM nginx:alpine AS app

WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist/ ./
COPY ./src/favicon.ico ./
