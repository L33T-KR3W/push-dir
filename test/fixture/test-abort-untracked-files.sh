#!/usr/bin/env bash

touch meow


node $PUSH_DIR build:gh-pages
if [ $? -ne 1 ]; then
  exit 11
fi
