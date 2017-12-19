BROWSERIFY = ./node_modules/.bin/browserify
UGLIFY = ./node_modules/uglify-es/bin/uglifyjs

run-demo:
	wzrd app.js:index.js -- \
		-d

build-demo:
	$(BROWSERIFY) app.js | $(UGLIFY) -c -m -o index.js
