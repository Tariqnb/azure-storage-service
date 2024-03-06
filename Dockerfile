FROM node:20.11.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --mit=dev
COPY ,/src ./src

CMD npm start
