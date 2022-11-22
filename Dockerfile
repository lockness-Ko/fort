FROM alpine:latest

# RUN pacman -Syu --noconfirm nginx nodejs npm
RUN apk update
RUN apk add nodejs npm nginx openssl redis bash

# Environment vars
ARG STORAGE_PATH
ENV STORAGE_PATH $STORAGE_PATH

ARG LAT
ARG LON
ENV LAT $LAT
ENV LON $LON

COPY prepare.sh .
RUN ./prepare.sh

WORKDIR /app
COPY app .

RUN npm install
RUN npm run build

COPY run.sh .

CMD ["./run.sh"]
