FROM node:12-alpine as uibuild

RUN apk --no-cache add make

COPY . /singlecloud-ui
RUN cd /singlecloud-ui && make build

FROM alpine:latest

ARG version
ARG buildtime
ARG branch

LABEL ui.zcloud/version=$version ui.zcloud/buildtime=$buildtime ui.zcloud/branch=$branch

COPY --from=uibuild /singlecloud-ui/packages/ui/build /www

WORKDIR /www
