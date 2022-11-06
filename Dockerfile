FROM archlinux:latest

RUN pacman -Sy --noconfirm nginx nodejs npm

WORKDIR /app
COPY app .

RUN npm run build

RUN ["./run.sh"]
