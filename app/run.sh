#! /bin/ash

npm run preview &

nginx

tail -f /var/log/nginx/access.log
