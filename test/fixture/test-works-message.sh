#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# push-dir
node $PUSH_DIR build:gh-pages --message="can't touch this"
if [ $? -ne 0 ]; then
  exit 11
fi

# check remote got new code
LOCAL_HASH="can't touch this"
REMOTE_HASH=`git log -1 --pretty=format:%s%n origin/gh-pages`
if [[ $LOCAL_HASH != $REMOTE_HASH ]]; then
  exit 12
fi
