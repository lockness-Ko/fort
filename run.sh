#! /bin/ash

# Setup environment vars
echo -n "ADMIN_LOGIN=" > /app/.env
echo $ADMIN_LOGIN > /app/.env

echo -n "STORAGE_PATH=" >> /app/.env
echo $STORAGE_PATH >> /app/.env

echo -n "LAT" >> /app/.env
echo $LAT >> /app/.env

echo -n "LON=" >> /app/.env
echo $LON >> /app/.env

cat /app/.env

# Setup storage
mkdir -p $STORAGE_PATH/static/download $STORAGE_PATH/static/thumb

# Run web app
npm run preview &
nginx

# Run forever
tail -f /var/log/nginx/access.log
