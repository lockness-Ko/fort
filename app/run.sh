#! /bin/ash

npm run dev &

nginx

tail -f /var/log/nginx/access.log
