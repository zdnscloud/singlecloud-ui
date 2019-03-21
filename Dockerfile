FROM node:10-alpine

COPY . /singlecloud-ui
RUN cd /singlecloud-ui && make build && cp -r /singlecloud-ui/packages/ui/build /www

WORKDIR /singlecloud-ui

ENTRYPOINT ["npm", "start"]
