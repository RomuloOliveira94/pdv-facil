FROM php:fpm-alpine3.20 as php-setup

WORKDIR /srv/app

COPY composer.lock composer.json /srv/app/
# Install system dependencies
RUN apk add --no-cache dcron busybox-suid libcap curl zip unzip git

# Install PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions intl bcmath gd pdo_mysql pdo_pgsql opcache redis uuid exif pcntl zip

# Install composer
COPY --from=composer/composer:2 /usr/bin/composer /usr/local/bin/composer

# Add non-root user: 'app'
ARG NON_ROOT_GROUP=${NON_ROOT_GROUP:-app}
ARG NON_ROOT_USER=${NON_ROOT_USER:-app}
RUN addgroup -S $NON_ROOT_GROUP && adduser -S $NON_ROOT_USER -G $NON_ROOT_GROUP
RUN addgroup $NON_ROOT_USER wheel

# Switch to non-root 'app' user & install app dependencies
COPY composer.json composer.lock ./
RUN chown -R $NON_ROOT_USER:$NON_ROOT_GROUP /srv/app
USER $NON_ROOT_USER
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader
RUN rm -rf /home/$NON_ROOT_USER/.composer

# Copy app
COPY --chown=$NON_ROOT_USER:$NON_ROOT_GROUP . /srv/app/
COPY ./.docker/config/php/local.ini /usr/local/etc/php/conf.d/local.ini

#install node for inertiajs
FROM alpine:3.20 as install-node

WORKDIR /srv/app

RUN apk add nodejs npm

COPY --from=php-setup /srv/app /srv/app

RUN npm install && npm run build

RUN rm -rf node_modules

FROM php-setup

COPY --from=install-node /srv/app /srv/app

# Instale o Caddy
COPY --from=caddy:2.2.1 /usr/bin/caddy /usr/local/bin/caddy

# Exponha a porta 80
EXPOSE 80

# Copie o arquivo de configuração do Caddy
COPY ./.docker/config/Caddyfile /etc/caddy/Caddyfile

COPY ./.docker/entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]
