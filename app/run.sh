#! /bin/bash

npm run preview &

nginx

tail -f /var/log/nginx/access.log
