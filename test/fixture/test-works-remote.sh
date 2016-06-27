#!/usr/bin/env bash

git remote add zzz ../fixture-remote/.git


# push-dir
node $PUSH_DIR zzz build:gh-pages
if [ $? -ne 0 ]; then
  exit 11
fi


# check remote got new code
LOCAL_HASH=`git rev-parse HEAD`
REMOTE_HASH=`git log -1 --pretty=format:%s%n zzz/gh-pages`
if [[ $LOCAL_HASH != $REMOTE_HASH ]]; then
  exit 12
fi
