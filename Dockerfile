#Базовый образ
FROM node:lts-alpine
#Мета-данные
LABEL author="DanilSord" \
      version="1"
#Устанавливает рабочий каталог для последующих инструкций
WORKDIR /app
COPY package*.json ./
#Выполнение команды в shell форме, установка зависиммостей
RUN apk --no-cache add pkgconfig autoconf automake libtool libpng libpng-dev jpeg-dev libjpeg-turbo-dev libjpeg nasm build-base zlib-dev
RUN npm install
COPY . .
#Выполнение команды в shell форме, сборка production версии проекта
RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 80
#Команда выполняемая при запуске образа, запускаем простой http-server и передаём ему каталог production сборки для раздачи.
CMD [ "npm", "run", "start" ]
