lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test

show:
	node gendiff.js file1.json file2.json