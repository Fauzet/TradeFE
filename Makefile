default: frontend

PHP_ROUTER=server.php

.PHONY: frontend
frontend:
	if command -v php; then \
		php -S 127.0.0.1:8080 $(PHP_ROUTER); \
	elif command -v python3; then \
		python3 server.py; \
	elif command -v python2; then \
		python2 server.py; \
	else \
		echo You don\'t have one of these command: php/python3/python2; \
	fi

.PHONY: scss
scss: SCSS_FLAGS=
scss: SCSS_OPTIONS=-I=scss --no-source-map
scss:
	sass scss/index.scss css/index.css $(SCSS_OPTIONS) $(SCSS_FLAGS)
