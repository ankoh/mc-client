FROM nginx:latest
MAINTAINER Andre Kohn <andre@kohn.io>

# Prepare configuration
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Copy app folder with preinstalled bower_components (!!)
COPY ./app /usr/share/nginx/html

# Fix permissions
RUN chmod -R 755 /usr/share/nginx/html && \
	chown -R root:root /usr/share/nginx/html

# Add Entrypoint
COPY ./docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTYPOINT['/entrypoint.sh']

# Only expose 80
EXPOSE 80
