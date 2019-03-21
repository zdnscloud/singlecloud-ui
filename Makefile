VERSION=$${VERSION:-dev}

default:
	@echo "try make build or test"

build: bootstrap
	make -C packages/ui build

test:
	make -C packages/ui test

bootstrap:
	yarn && npm run bootstrap

docker: build-image
	docker push zdnscloud/singlecloud-ui:${VERSION}

build-image:
	docker build -t zdnscloud/singlecloud-ui:${VERSION} .
