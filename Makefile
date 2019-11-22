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

docs:
	mdbook build

deploy-docs: docs
	@echo "====> deploying to github"
	@-rm -rf /tmp/sui-docs
	-git worktree add -f /tmp/sui-docs gh-pages
	rm -rf /tmp/sui-docs/*
	cp -rp book/* /tmp/sui-docs/
	cd /tmp/sui-docs && \
		git add -A && \
		git commit -m "deployed on $(shell date) by $(shell git config user.name)" && \
		git push -f origin gh-pages

check-update:
	ncu --removeRange -u
	cd packages/ui; ncu --removeRange -u
	cd packages/com; ncu --removeRange -u
	cd packages/utils; ncu --removeRange -u
	cd packages/benchmark; ncu --removeRange -u

