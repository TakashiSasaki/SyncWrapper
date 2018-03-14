.PHONY: prepare test

test:
	@NODE_PATH=HashWrapper node test.js

prepare:
	sudo n stable; \
	sudo npm update -g; \
	npm update ;

