FROM node:10 AS base

WORKDIR /usr/app

COPY . . 

RUN npm install

RUN npm run build