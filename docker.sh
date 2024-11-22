#!/bin/bash

if [ "$1" = "up" ]; then
    echo "Building the project and starting containers..."
    nx run-many --target=build
    sudo docker compose up -d
elif [ "$1" = "down" ]; then
    echo "Stopping containers and removing images..."
    sudo docker compose down --rmi all
else
    echo "Usage: $0 {up|down}"
fi
