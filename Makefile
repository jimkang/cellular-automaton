test:
	node tests/parse-cell-map-tests.js
	node tests/instantiate-cells-tests.js
	node tests/game-of-life-tests.js

pushall:
	git push origin master && npm publish

prettier:
	prettier --single-quote --write "**/*.js"
