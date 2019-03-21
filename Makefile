default:
	@echo "try make build or test"

build: bootstrap
	make -C packages/ui build

test:
	make -C packages/ui test

bootstrap:
	yarn && npm run bootstrap
