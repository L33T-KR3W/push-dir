#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# staged changes
git reset --hard && git clean -fdx
git commit --allow-empty -m "yolo"
echo "yolo" > yolo.js
git add yolo.js
git status
node $PUSH_DIR --dir build --branch gh-pages --allow-unclean
if [ $? -ne 0 ]; then
  exit 1
fi


# unstaged changes
git reset --hard && git clean -fdx
git commit --allow-empty -m "yolo"
echo "yolo" > yolo.js
git status
node $PUSH_DIR --dir build --branch gh-pages --allow-unclean
if [ $? -ne 0 ]; then
  exit 2
fi


# untracked files
git reset --hard && git clean -fdx
git commit --allow-empty -m "yolo"
touch meow
git status
node $PUSH_DIR --dir build --branch gh-pages --allow-unclean
if [ $? -ne 0 ]; then
  exit 3
fi
