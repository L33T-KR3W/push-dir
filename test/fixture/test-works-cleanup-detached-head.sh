#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git
git checkout --detach master
HASH=`git rev-parse --short HEAD`


# check succeeds
node $PUSH_DIR --dir build --branch gh-pages --cleanup
if [ $? -ne 0 ]; then
  exit 1
fi


# check git is clean
CLEAN=`git status --porcelain`
if [ ${#CLEAN} -ne 0 ]; then
  exit 2
fi


# check commit hash is right
HASH_NOW=`git rev-parse --short HEAD`
if [[ $HASH != $HASH_NOW ]]; then
  exit 3
fi


# check branch is head
CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
if [[ $CURRENT_BRANCH != "HEAD" ]]; then
  exit 4
fi


# check head is detached
git symbolic-ref --short -q HEAD
if [ $? -ne 1 ]; then
  exit 5
fi
