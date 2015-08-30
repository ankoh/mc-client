#!/bin/bash

if [ -z "$MC_SERVER" ]; then
    echo "You need to provide MC_SERVER as environment variable"
    exit 1
fi

if [ -f /usr/share/nginx/html/config.json ]; then
	rm /usr/share/nginx/html/config.json
fi

cat >/usr/share/nginx/html/config.json <<EOL
{
	"server":"$MC_SERVER"
}
EOL

exec "$@"