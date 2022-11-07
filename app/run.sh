#! /bin/ash

echo $ADMIN_LOGIN $STORAGE_PATH $LAT $LON

echo -n "ADMIN_LOGIN=" > /app/.env
echo $ADMIN_LOGIN > /app/.env

echo -n "STORAGE_PATH=" > /app/.env
echo $STORAGE_PATH >> /app/.env

mkdir -p $STORAGE_PATH/static/{download,thumb}

npm run preview &
nginx

tail -f /var/log/nginx/access.log
