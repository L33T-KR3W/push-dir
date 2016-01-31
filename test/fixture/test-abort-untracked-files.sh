#!/usr/bin/env bash

touch meow


node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 1 ]; then
  exit 1
fi
