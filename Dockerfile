FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache(optional)
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -u 1000 -ms /bin/bash -g www-data laravel

COPY . /srv/app

COPY --chown=laravel:www-data . /srv/app

USER laravel

EXPOSE 80

CMD ["php-fpm"]