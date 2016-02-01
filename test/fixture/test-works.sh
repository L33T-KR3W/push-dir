#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# do first push-dir
node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 0 ]; then
  exit 1
fi


# check for one gh-pages branch
COUNT=`git branch | grep "gh-pages" | wc -l`
if [ $COUNT -ne 1 ]; then
  exit 2
fi


# do second push-dir
echo 'swag' >> build/yolo.min.js
git commit -am 'swag'
node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 0 ]; then
  exit 3
fi


# check for two gh-pages branches
COUNT=`git branch | grep "gh-pages" | wc -l`
if [ $COUNT -ne 2 ]; then
  exit 4
fi
