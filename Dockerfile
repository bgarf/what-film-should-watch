FROM node:14 AS base

WORKDIR /usr/app

COPY . . 

RUN npm install

RUN npm run build

EXPOSE 8080:8080

CMD ["npm", "run", "start"]