#! /bin/ash

# Setup environment vars
echo -n "STORAGE_PATH=$STORAGE_PATH" >> /app/.env
echo -n "LAT=$LAT" >> /app/.env
echo -n "LON=$LON" >> /app/.env

cat /app/.env

# Setup ssl certs
mkdir -p /app/certs
openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 -keyout /app/certs/fort.key -out /app/certs/fort.crt
