# Teste webhook
FROM nginx

COPY nginx/ /etc/nginx
COPY build /usr/share/nginx/html/conquista
