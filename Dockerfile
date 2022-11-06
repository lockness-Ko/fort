FROM archlinux:latest

RUN pacman -Syu --noconfirm nginx nodejs npm

WORKDIR /app
COPY app .

RUN npm run build

CMD ["./run.sh"]
