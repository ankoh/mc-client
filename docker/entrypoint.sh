#!/bin/bash

if [ -z "$MC_SERVER_HOSTNAME" ]; then
    echo "You need to provide MC_SERVER_HOSTNAME as environment variable"
    exit 1
fi

if [ -z "$MC_SERVER_PORT" ]; then
    echo "You need to provide MC_SERVER_PORT as environment variable"
    exit 1
fi

cat >/usr/share/nginx/html/config.json <<EOL
var mcConfig = {
	"cache": {
		"hostname": "$MC_SERVER_HOSTNAME",
		"port": "$MC_SERVER_PORT"
	}
}
EOL

exec "$@"