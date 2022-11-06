FROM alpine:latest

# RUN pacman -Syu --noconfirm nginx nodejs npm
RUN apk update
RUN apk add nodejs npm nginx

WORKDIR /app
COPY app .

RUN npm run build

CMD ["./run.sh"]
