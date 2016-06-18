#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


node $PUSH_DIR --help
if [ $? -ne 0 ]; then
  exit 11
fi


node $PUSH_DIR -h
if [ $? -ne 0 ]; then
  exit 12
fi


node $PUSH_DIR build:gh-pages --help
if [ $? -ne 0 ]; then
  exit 13
fi


node $PUSH_DIR origin build:gh-pages --help
if [ $? -ne 0 ]; then
  exit 14
fi


HELP_MESSAGE=`node $PUSH_DIR --help`
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 15
fi
