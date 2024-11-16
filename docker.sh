#!/bin/bash

up() {
    echo "Building the project and starting containers..."
    nx run-many --target=build
    sudo docker-compose up -d
}

down() {
    echo "Stopping containers and removing images..."
    sudo docker-compose down --rmi all
}

if [ "$1" = "up" ]; then
    up;
elif [ "$1" = "down" ]; then
    down;
else
    echo "Usage: $0 {up|down}"
fi
