#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


node $PUSH_DIR --dir build --branch gh-pages --cleanup
if [ $? -ne 0 ]; then
  exit 1
fi


# check for gh-pages branches
COUNT=`git branch | grep "gh-pages" | wc -l`
if [ $COUNT -ne 0 ]; then
  exit 2
fi
