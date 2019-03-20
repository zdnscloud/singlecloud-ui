default:
	@echo "try make build or test"

build:
	make -C packages/ui build

test:
	make -C packages/ui test

bootstrap:
	yarn && npm run bootstrap
