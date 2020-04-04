ARG RUBY_VERSION
ARG NODE_VERSION

FROM node:$NODE_VERSION-alpine as build-node

FROM ruby:$RUBY_VERSION-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache git yarn bash gcc g++ make tzdata linux-headers zlib-dev openssl-dev readline-dev mariadb-dev sqlite-dev && \
    gem install foreman

COPY --from=build-node /usr/local/bin/node /usr/bin/node
COPY --from=build-node /usr/local/bin/npm /usr/bin/npm

WORKDIR /opt/app
ENV BUNDLE_APP_CONFIG /opt/app/.bundle
