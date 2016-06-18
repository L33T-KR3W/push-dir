#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# no args
node $PUSH_DIR
if [ $? -ne 1 ]; then
  exit 11
fi


# just dir
node $PUSH_DIR build
if [ $? -ne 1 ]; then
  exit 12
fi


# just remote + dir
node $PUSH_DIR origin build
if [ $? -ne 1 ]; then
  exit 13
fi


# empty branch
node $PUSH_DIR build:
if [ $? -ne 1 ]; then
  exit 14
fi


# colon branch
node $PUSH_DIR build::
if [ $? -ne 1 ]; then
  exit 15
fi
