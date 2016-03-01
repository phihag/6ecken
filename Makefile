default: help

help:
	@echo 'make targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-13s %s\n", $$1, $$2}'
	@echo '  help          This message'


deps: ## Download and install all dependencies (for compiling / testing / CLI operation)
	(node --version && npm --version) >/dev/null 2>/dev/null || sudo apt-get install nodejs npm
	npm install

cleandist:
	rm -rf -- dist

manifest: appcache-manifest

appcache-manifest:
	node div/make_manifest.js dist/6ecken/

dist: cleandist ## Create distribution files
	mkdir -p dist/6ecken

	node div/make_dist.js . dist/6ecken/ dist/tmp

	svgo -f icons/ -o dist/6ecken/icons/
	cp div/dist_htaccess dist/6ecken/.htaccess
	mkdir -p dist/6ecken/sounds/
	# TODO copy sounds
	cp \
		sounds/*.mp3
		--target-directory dist/6ecken/div/

	$(MAKE) appcache-manifest

	find dist -exec touch --date "$$(git log -1 --date=iso | sed -n -e 's/Date:\s*\([0-9 :-]*\)+.*/\1/p')" '{}' ';'
	cd dist && zip 6ecken.zip 6ecken/ -rq

upload: dist ## Upload to demo page
	cp div/dist_upload_config.json dist/.upload_config.json
	cp div/dist_public dist/.public
	$(MAKE) upload-run

upload-run:
	cd dist && upload

test: ## Run tests
	@npm test

lint: jshint eslint ## Verify source code quality

jshint:
	@jshint js/ div/*.js

eslint:
	@eslint js/ div/*.js

coverage:
	istanbul cover _mocha -- -R spec

coverage-display: coverage
	xdg-open coverage/lcov-report/js/index.html

cd: coverage-display

clean: cleandist ## remove temporary files
	rm -rf -- libs
	rm -rf -- node_modules

.PHONY: default help deps test clean upload dist cleandist coverage coverage-display cd lint jshint eslint appcache-manifest manifest upload-run
