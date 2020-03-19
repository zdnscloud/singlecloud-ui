FROM node:12-alpine as uibuild

RUN apk --no-cache add make



COPY . /singlecloud-ui
RUN cd /singlecloud-ui && make build

FROM scratch

COPY --from=uibuild /singlecloud-ui/packages/ui/build /www

WORKDIR /www
