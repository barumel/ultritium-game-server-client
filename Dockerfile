FROM node:12.16.2-alpine

RUN mkdir -p /tmp/build

RUN mkdir -p /srv/client

WORKDIR /tmp/build

COPY package*.json ./

COPY src ./src

COPY public ./public

RUN set -ex; \
  npm install; \
  npm run build

RUN cp -r /tmp/build/build/* /srv/client

RUN rm -rf /tmp/build

WORKDIR /srv/client
