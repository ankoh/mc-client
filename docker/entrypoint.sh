#!/bin/bash

MC_VERSION=0.1.0

if [ -z "$MC_SERVER_HOSTNAME" ]; then
    echo "You need to provide MC_SERVER_HOSTNAME as environment variable"
    exit 1
fi

if [ -z "$MC_SERVER_PORT" ]; then
    echo "You need to provide MC_SERVER_PORT as environment variable"
    exit 1
fi

# Write config.json
cat >/usr/share/nginx/html/config.json <<EOL
var mcConfig = {
	"client": {
		"version": "$MC_VERSION"
	},
	"cache": {
		"hostname": "$MC_SERVER_HOSTNAME",
		"port": "$MC_SERVER_PORT"
	}
}
EOL

# Configure embed.js with hostname and port
sed -i'' -e s%:base_host%$MC_SERVER_HOSTNAME% -e s%:base_port%$MC_SERVER_PORT% /usr/share/nginx/html/dist/embed.js


exec "$@"