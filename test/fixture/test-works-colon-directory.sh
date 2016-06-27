#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git
git mv build/ build:me/
git commit -m 'ezpz'


# push-dir
node $PUSH_DIR build:me:gh-pages
if [ $? -ne 0 ]; then
  exit 11
fi


# check remote got new code
LOCAL_HASH=`git rev-parse HEAD`
REMOTE_HASH=`git log -1 --pretty=format:%s%n origin/gh-pages`
if [[ $LOCAL_HASH != $REMOTE_HASH ]]; then
  exit 12
fi
