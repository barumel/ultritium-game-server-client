FROM node:12.16.2-alpine

RUN mkdir -p /tmp/build

RUN mkdir -p /src/client

WORKDIR /tmp/build

COPY package*.json ./

COPY src ./src

COPY public ./public

RUN set -ex; \
  npm install; \
  npm run build

RUN cp -r /tmp/build/build/* /src/client

RUN rm -rf /tmp/build

WORKDIR /src/client
