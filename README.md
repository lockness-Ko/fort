# fort 🏰

A minimalistic alternative to nextcloud.

## Screenshots

![](assets/weather.png)
![](assets/files_poc.png)
![](assets/files_readme.png)
![](assets/upload.png)
![](assets/mobile.png)

This one's the lighthouse score through a slow vpn connection in a different country connecting to an instance on a residential ip!

![](assets/lighthouse.png)

## Installation

To install, all you need is docker and docker-compose and common sense (please don't use the default credentials).

You should edit `docker-compose.yml` and change the storage location for persistent storage (`STORAGE_PATH`).

The default login is `admin:admin`. You can change this and add new users by running the `add-user` script:

```bash
# Change admin password
docker-compose exec -it www /app/add-user "admin" "password"

# Add a new user
docker-compose exec -it www /app/add-user "username" "password"
```

You'll also need to edit the `LAT` and `LON` environment variables if you want accurate weather info.

To run the service, type the following command:

```bash
docker-compose up -d
```

and visit the webpage in your browser.

## Authentication/Authorizing

Since I will probably forget how I've implemented authentication in the future, here's how I did it:

- User clicks login
- Server checks password against bcrypt hash in private db (the key is the user)
- If the user has the right password continue, otherwise return 401
- Create a JWT that stores the user as the payload
- JWT is signed by the server
- User can use this jwt cookie as authorization to prove they are a specific user

### Mitigations agaisnt JWT bruteforcing

When the server starts up for the first time, it generates a random string of 2048 chars out of a choice of 88 chars. This is an arbitrary number that I think is **strong enough** against bruteforcing. Feel free to disagree with a pr.

## Todo

 - [x] Docker support
 - [x] Basic file upload and download
 - [x] No third-party cross-origin nonsense on client-side
 - [x] File browser
 - [ ] File editor
	 - [x] Create files
	 - [x] Create folders
	 - [x] Upload files to directory
	 - [x] Delete files
	 - [x] Rename files
	 - [ ] Rename folders
	 - [x] Edit text files
 - [ ] Layer 7 stuff
   - [x] HTTP/2 support
   - [ ] HTTP/3 support
   - [x] TLS support
 - [x] Users and access control
   - [x] Better cookie+jwt based auth
   - [x] Access control
   - [x] Sharing files and folders
 - [ ] Upload progress bar
 - [x] Support multiple files
 - [x] The weather and stuff
 - [ ] Custom dashboard creation
