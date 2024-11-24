FROM node:23.3.0-slim

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["node", "main.js"]
