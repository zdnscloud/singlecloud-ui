FROM node:10-alpine

RUN apk update && apk add make

COPY . /singlecloud-ui
RUN cd /singlecloud-ui && make build && cp -r /singlecloud-ui/packages/ui/build /www && rm -rf /singlecloud-ui

WORKDIR /singlecloud-ui
