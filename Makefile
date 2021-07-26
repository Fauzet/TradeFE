default: frontend

include ../Makefile

.PHONY: scss
scss: SCSS_FLAGS=
scss: SCSS_OPTIONS=-I=scss --no-source-map
scss:
	sass scss/index.scss css/index.css $(SCSS_OPTIONS) $(SCSS_FLAGS)
