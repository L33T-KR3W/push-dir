#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git
git checkout --detach master
HASH=`git rev-parse HEAD`


# check succeeds
node $PUSH_DIR build:gh-pages
if [ $? -ne 0 ]; then
  exit 11
fi


# check git is clean
CLEAN=`git status --porcelain`
if [ ${#CLEAN} -ne 0 ]; then
  exit 12
fi


# check commit hash is right
HASH_NOW=`git rev-parse HEAD`
if [[ $HASH != $HASH_NOW ]]; then
  exit 13
fi


# check branch is head
CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
if [[ $CURRENT_BRANCH != "HEAD" ]]; then
  exit 14
fi


# check head is detached
git symbolic-ref -q HEAD
if [ $? -ne 1 ]; then
  exit 15
fi
