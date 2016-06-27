#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# push-dir
node $PUSH_DIR build:gh-pages --message="can't touch this"
if [ $? -ne 0 ]; then
  exit 11
fi

# check remote has correct message
LOCAL_MESSAGE="can't touch this"
REMOTE_MESSAGE=`git log -1 --pretty=format:%s%n origin/gh-pages`
if [[ $LOCAL_MESSAGE != $REMOTE_MESSAGE ]]; then
  exit 12
fi
