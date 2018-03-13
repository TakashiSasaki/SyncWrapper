.PHONY: prepare test

test:
	node test.js

prepare:
	sudo n stable; \
	sudo npm update -g; \
	npm update ;

