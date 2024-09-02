FROM php:8.2-apache

# Instalar dependencias de PHP
RUN apt-get update
RUN apt-get install -y libzip-dev zip unzip git libgmp-dev re2c libmhash-dev libmcrypt-dev file
RUN ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/local/include/
RUN docker-php-ext-configure gmp
RUN docker-php-ext-install gmp
RUN docker-php-ext-install zip pdo pdo_mysql bcmath
RUN apt-get install nano
# Copiar la configuración de Apache
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar los archivos de la aplicación Laravel al contenedor
COPY . .

#copiar el archivo .env.example a .env
COPY .env.example .env
#RUN cp .env.example .env

#copiar .htaccess a la carpeta public
COPY .htaccess.example /var/www/html/public/.htaccess
#RUN cp .htaccess.example /var/www/html/public/.htaccess

# Instalar dependencias de Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependencias de Laravel
RUN composer install

# Establecer los permisos adecuados
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 80
EXPOSE 80


