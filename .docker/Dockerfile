FROM php:8.2-fpm-alpine as php-setup

COPY composer.lock composer.json /srv/app/

WORKDIR /srv/app

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    libgd-dev
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-external-gd
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#install node for inertiajs
FROM alpine:3.20 as install-node

WORKDIR /srv/app

RUN apk add --no-cache nodejs npm

COPY --from=php-setup /srv/app /srv/app

RUN npm install
RUN npm run build

FROM php:8.2-fpm-alpine as php-production

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /srv/app

# Copy existing application directory permissions
COPY --chown=www:www . /srv/app

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000

CMD ["php-fpm"]
