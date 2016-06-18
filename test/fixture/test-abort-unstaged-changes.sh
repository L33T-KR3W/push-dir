#!/usr/bin/env bash

echo "yolo" > yolo.js


node $PUSH_DIR build:gh-pages
if [ $? -ne 1 ]; then
  exit 11
fi
