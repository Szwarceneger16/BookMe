FROM php:7.4

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN composer install

EXPOSE 8000
CMD php artisan serve