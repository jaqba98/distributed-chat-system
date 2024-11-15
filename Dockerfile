FROM ubuntu:latest AS ubuntu

WORKDIR /app

RUN apt update
RUN apt upgrade -y
RUN apt install nodejs -y
RUN apt install npm -y
RUN npm install nx -g

COPY . .

RUN npm install
