FROM nginx:latest
MAINTAINER Andre Kohn <andre@kohn.io>

# Prepare configuration
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy app folder with preinstalled bower_components (!!)
COPY app /usr/share/nginx/html

# Fix permissions
RUN chmod -R 755 /usr/share/nginx/html && \
	chown -R root:root /usr/share/nginx/html

# Only expose 80
EXPOSE 80
