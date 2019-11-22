FROM alpine:3.10

MAINTAINER GSMLG < me@gsmlg.org >

RUN apk update \
    && apk add nginx \
    && apk add nginx-mod-http-headers-more \
    && mkdir /etc/nginx/sites \
    && touch /etc/nginx/ssl.conf \
    && rm /etc/nginx/conf.d/default.conf \
    && rm -rf /var/cache/apk/*


EXPOSE 80 443

COPY nginx.conf /etc/nginx/
COPY certs /etc/

COPY entrypoint.sh /

COPY --from=zdnscloud/singlecloud-ui:linkerd /www /singlecloud-ui

ENTRYPOINT ["/entrypoint.sh"]
