FROM node:10-alpine

RUN apk update && apk add make

COPY . /singlecloud-ui
RUN cd /singlecloud-ui && make build && cp -r /singlecloud-ui/packages/ui/build /www

WORKDIR /singlecloud-ui

ENTRYPOINT ["npm", "start"]
