#!/bin/sh

set -e

SINGLECLOUD=${SINGLECLOUD:-202.173.9.57:8088}

LINKERD=${LINKERD:-202.173.9.57:50750}

cat <<EOF > /etc/nginx/conf.d/upstream.conf
upstream @singlecloud {
  server ${SINGLECLOUD};
}

upstream @linkerd {
  server ${LINKERD};
}
EOF

cat <<"EOF" > /etc/nginx/sites/gateway
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  root /singlecloud-ui;

  location /assets {
    alias /singlecloud-ui;
  }

  location ~* (^/apis/zcloud.cn/v1/clusters/([^\/]+)/linkerd)|(^/clusters/([^\/]+)/linkerd/grafana)|(^/grafana) {
    # Allow websocket connections
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header X-Real-IP  $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_http_version 1.1;
    chunked_transfer_encoding off;
    proxy_buffering off;
    proxy_cache_bypass $http_pragma;
    proxy_cache_revalidate on;
    rewrite ^/apis/zcloud.cn/v1/clusters/[^\/]+/linkerd(.+)$ $1 break;
    rewrite ^/clusters/[^\/]+/linkerd/grafana(.+)$ /grafana$1 break;
    proxy_pass http://@linkerd;
  }

  location ~ ^/(apis|web) {
    proxy_connect_timeout 3600s;
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header X-Real-IP  $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_http_version 1.1;
    chunked_transfer_encoding off;
    proxy_buffering off;
    proxy_cache_bypass $http_pragma;
    proxy_cache_revalidate on;
    proxy_redirect off;
    proxy_pass http://@singlecloud;
  }

  location / {
    try_files $uri /assets/index.html;
  }
}

# server {
#   listen 443 default_server ssl http2;
#   listen [::]:443 default_server ssl http2;
#   server_name _;
# }

EOF

# Launch nginx in foreground
echo "Starting Nginx..."
"/usr/sbin/nginx" "-g" "daemon off;"
