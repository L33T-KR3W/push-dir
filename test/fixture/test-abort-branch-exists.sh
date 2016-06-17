#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


node $PUSH_DIR build:gh-pages --preserve-local-temp-branch
if [ $? -ne 0 ]; then
  exit 1
fi


node $PUSH_DIR build:gh-pages
if [ $? -ne 1 ]; then
  exit 2
fi
