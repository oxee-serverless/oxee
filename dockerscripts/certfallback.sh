openssl req -new -newkey rsa:2048 -days 3650 -nodes -x509 \
            -subj '/CN=sni-support-required-for-valid-ssl' \
            -keyout /etc/ssl/certs/fallback.key \
            -out /etc/ssl/certs/fallback.crt
