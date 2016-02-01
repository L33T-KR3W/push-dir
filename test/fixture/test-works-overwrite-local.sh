#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# do first push-dir
node $PUSH_DIR --dir build --branch gh-pages
if [ $? -ne 0 ]; then
  exit 1
fi


# test --overwrite-local
node $PUSH_DIR --dir build --branch gh-pages --overwrite-local
if [ $? -ne 0 ]; then
  exit 2
fi
