FROM php:8.2-apache

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql mysqli

COPY . .

RUN echo "<Directory /var/www/html>
    Options Indexes FollowSymLinks
    AllowOverride All
    DirectoryIndex index.php index.html
    Require all granted
</Directory>" > /etc/apache2/conf-available/custom-directory.conf && \
    a2enconf custom-directory

EXPOSE 80

CMD ["apache2-foreground"]