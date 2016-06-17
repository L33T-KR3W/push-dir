#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# push-dir
node $PUSH_DIR build:gh-pages --preserve-local-temp-branch
if [ $? -ne 0 ]; then
  exit 1
fi


# check for temp branch
COUNT=`git branch | grep "gh-pages" | wc -l`
if [ $COUNT -ne 1 ]; then
  exit 2
fi
