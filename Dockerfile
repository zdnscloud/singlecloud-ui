FROM node:10-alpine as uibuild

RUN apk update && apk add make

COPY . /singlecloud-ui
RUN cd /singlecloud-ui && make build

FROM alpine
COPY --from=uibuild /singlecloud-ui/packages/ui/build /www

WORKDIR /www
