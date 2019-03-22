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
	docker tag zdnscloud/singlecloud-ui:${VERSION} zdnscloud/singlecloud-ui:latest
	docker push zdnscloud/singlecloud-ui:latest

build-image:
	docker build -t zdnscloud/singlecloud-ui:${VERSION} .

clean-image:
	docker rmi zdnscloud/singlecloud-ui:${VERSION}
