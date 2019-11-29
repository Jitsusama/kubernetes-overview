FROM node:12-alpine AS build

WORKDIR /build
COPY ./package.json ./package-lock.json ./
COPY ./src/ ./src/
RUN npm install
RUN npm run build

FROM node:12-alpine AS app

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install --only=prod
COPY ./server.js ./
COPY --from=build /build/dist/ ./dist/

ENTRYPOINT ["node", "./server.js"]
