#!/usr/bin/env bash

# biome
pnpm biome check --write --unsafe .

node_modules/.bin/prettier -w "**/*.md" "**/*.yml" "**/*.html"



# stylefmt for SCSS
# pnpm stylefmt --recursive '**/*.css'

# ruff
#ruff check --fix .
#ruff format .

# nginx
#find . -type f -name '*.conf' -path '*/nginx*' -exec nginxfmt -v {} +;

# taplo
taplo format
