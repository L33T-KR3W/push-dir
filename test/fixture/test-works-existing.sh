#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# push-dir 1
node $PUSH_DIR build:gh-pages
if [ $? -ne 0 ]; then
  exit 11
fi

# check remote got new code
LOCAL_HASH=`git rev-parse HEAD`
REMOTE_HASH=`git log -1 --pretty=format:%s%n origin/gh-pages`
if [[ $LOCAL_HASH != $REMOTE_HASH ]]; then
  exit 12
fi


# make changes
sleep 1
echo yolooooooooo > build/yolo.min.js
git commit -am 'changes'

# push-dir 2
node $PUSH_DIR build:gh-pages
if [ $? -ne 0 ]; then
  exit 13
fi

# check remote got new code
LOCAL_HASH=`git rev-parse HEAD`
REMOTE_HASH=`git log -1 --pretty=format:%s%n origin/gh-pages`
if [[ $LOCAL_HASH != $REMOTE_HASH ]]; then
  exit 14
fi

# check remote has old code
LOCAL_HASH=`git rev-parse HEAD~1`
REMOTE_HASH=`git log --pretty=format:%s%n origin/gh-pages | tail -n 1`
if [[ $LOCAL_HASH != $REMOTE_HASH ]]; then
  exit 15
fi
