#! /bin/ash

# Add users
/app/add-user "admin" "admin"

# Setup storage
mkdir -p $STORAGE_PATH/static/download $STORAGE_PATH/static/thumb $STORAGE_PATH/static/share

# Run web app
npm run preview &
nginx

# Run forever
tail -f /var/log/nginx/access.log
