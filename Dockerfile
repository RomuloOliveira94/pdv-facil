FROM php:8.2-fpm

# Instale dependências do sistema
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libssl-dev \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Instale o Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Configure o diretório de trabalho
WORKDIR /var/www/html

# Copie os arquivos do aplicativo
COPY . .

# Instale as dependências do PHP
RUN composer install --no-dev --optimize-autoloader

# Ajuste as permissões da pasta de cache e storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Defina o usuário atual para evitar problemas de permissões
USER www-data

# Exponha a porta padrão para o PHP-FPM
EXPOSE 9000

# Comando padrão do Docker para iniciar o PHP-FPM
CMD ["php-fpm"]
