FROM node:11-alpine

ENV LANG C.UTF-8
ENV TZ ASIA/Tokyo

WORKDIR /app

COPY ./package.json $WORKDIR
COPY ./package-lock.json $WORKDIR

RUN apk add --no-cache --virtual .builddep python2  && \
    npm install && \
    apk del .builddep --purge

RUN npm install -g firebase-tools

ENV HOST 0.0.0.0
EXPOSE 8000
EXPOSE 9005
