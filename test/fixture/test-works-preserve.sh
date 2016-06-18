#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# push-dir
node $PUSH_DIR build:gh-pages --preserve-local-temp-branch
if [ $? -ne 0 ]; then
  exit 11
fi


# check for temp branch
COUNT=`git branch | wc -l`
if [ $COUNT -ne 2 ]; then
  exit 12
fi
