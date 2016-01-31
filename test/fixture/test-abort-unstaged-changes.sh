#!/usr/bin/env bash

echo "yolo" > yolo.js


node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 1 ]; then
  exit 1
fi
