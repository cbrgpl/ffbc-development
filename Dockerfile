FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache add pkgconfig autoconf automake libtool libpng libpng-dev jpeg-dev libjpeg-turbo-dev libjpeg nasm build-base zlib-dev

RUN npm install

COPY . .

CMD [ "npm", "run", "serve" ]
