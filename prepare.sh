#! /bin/ash

# Setup ssl certs
mkdir -p /app/certs
openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 -keyout /app/certs/fort.key -out /app/certs/fort.crt
