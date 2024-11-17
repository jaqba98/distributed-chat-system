FROM node:23-alpine3.19

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install tslib

CMD ["node", "main.js"]
