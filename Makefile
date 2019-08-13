VERSION=`git describe --tags`
BUILD=`date +%FT%T%z`
BRANCH=`git branch | sed -n '/\* /s///p'`

default:
	@echo "try make build or test"

build: bootstrap
	make -C packages/ui build

test:
	make -C packages/ui test

bootstrap:
	yarn && npm run bootstrap

docker: build-image
	docker push zdnscloud/singlecloud-ui:${BRANCH}

build-image:
	docker build -t zdnscloud/singlecloud-ui:${BRANCH} --build-arg version=${VERSION} --build-arg buildtime=${BUILD} --build-arg branch=${BRANCH} .
	docker image prune -f

clean-image:
	docker rmi zdnscloud/singlecloud-ui:${BRANCH}

lint-staged:
	npm run lint:staged
