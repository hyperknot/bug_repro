#!/usr/bin/env bash

# biome
pnpm biome check --write --unsafe .

node_modules/.bin/prettier -w "**/*.md" "**/*.yml" "**/*.html"

