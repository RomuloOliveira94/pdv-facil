#!/bin/sh

echo "🎬 entrypoint.sh: [$(whoami)] [PHP $(php -r 'echo phpversion();')]"

composer dump-autoload --no-interaction --no-dev --optimize

echo "🎬 artisan commands"

# 💡 Group into a custom command e.g. php artisan app:on-deploy
php artisan migrate --no-interaction --force

# Inicia o PHP-FPM em segundo plano
php-fpm &

# Inicia o Caddy
caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
