#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


HELP_MESSAGE=`node $PUSH_DIR --help`
if [ $? -ne 0 ]; then
  exit 11
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 12
fi


HELP_MESSAGE=`node $PUSH_DIR -h`
if [ $? -ne 0 ]; then
  exit 13
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 14
fi


HELP_MESSAGE=`node $PUSH_DIR build:gh-pages --help`
if [ $? -ne 0 ]; then
  exit 15
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 16
fi


HELP_MESSAGE=`node $PUSH_DIR origin build:gh-pages --help`
if [ $? -ne 0 ]; then
  exit 17
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 18
fi


HELP_MESSAGE=`node $PUSH_DIR`
if [ $? -ne 1 ]; then
  exit 19
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 20
fi


HELP_MESSAGE=`node $PUSH_DIR asdf`
if [ $? -ne 1 ]; then
  exit 21
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 22
fi


HELP_MESSAGE=`node $PUSH_DIR asdf asdf asdf`
if [ $? -ne 1 ]; then
  exit 23
fi
if [ ${#HELP_MESSAGE} -lt 100 ]; then
  exit 24
fi
