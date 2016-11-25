#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# do first push-dir
COUNT=`node $PUSH_DIR --dir build --branch gh-pages | wc -c`
if [ $COUNT -gt 0 ]; then
  exit 1
fi


# do second push-dir
echo 'swag' >> build/yolo.min.js
git commit -am 'swag'
COUNT=`node $PUSH_DIR --dir build --branch gh-pages --verbose | wc -c`
if [ $COUNT -lt 100 ]; then
  exit 2
fi
