if [ -z "$1" ]; then
  echo "Argument is required! Use up / down.";
elif [ $1 == 'up' ]; then
  nx run-many --target=test
  nx run-many --target=build
  docker compose up -d
elif [ $1 == 'down' ]; then
  docker compose down --rmi all
else
  echo "Unsupported argument! Use up / down.";
fi
