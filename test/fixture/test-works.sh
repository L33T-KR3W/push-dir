#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 0 ]; then
  exit 1
fi


echo 'swag' >> build/yolo.min.js
git commit -am 'swag'
node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 0 ]; then
  exit 1
fi
