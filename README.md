# fort 🏰

A minimalistic alternative to nextcloud.

## Screenshots

![](assets/weather.png)
![](assets/files_poc.png)
![](assets/files_readme.png)
![](assets/upload.png)
![](assets/mobile.png)

## Installation

To install, all you need is docker and docker-compose and common sense (please don't use the default credentials).

You WILL need to edit `docker-compose.yml` and change the default credentials (`ADMIN_LOGIN`). You may also want to change the storage location for persistent storage (`STORAGE_PATH`).

You'll also need to edit the `LAT` and `LON` environment variables if you want accurate weather info.

To run the service, type the following command:

```bash
docker-compose up -d
```

and visit the webpage in your browser.

## Todo

 - [x] Docker support
 - [x] Basic file upload and download
 - [x] No third-party cross-origin nonsense on client-side
 - [x] File browser
 - [ ] File editor
	 - [ ] Create files
	 - [ ] Create folders
	 - [ ] Rename files
	 - [ ] Rename folders
	 - [ ] Edit files
 - [x] Support multiple files
 - [x] The weather and stuff
 - [ ] Custom dashboard creation
