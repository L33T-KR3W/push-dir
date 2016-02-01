#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git
git checkout --detach master


node $PUSH_DIR --dir build --branch gh-pages --cleanup
if [ $? -ne 0 ]; then
  exit 1
fi
