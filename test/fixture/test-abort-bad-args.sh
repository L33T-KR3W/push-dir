#!/usr/bin/env bash

git remote add origin ../fixture-remote/.git


# no args
node $PUSH_DIR
if [ $? -ne 1 ]; then
  exit 1
fi


# just dir
node $PUSH_DIR build
if [ $? -ne 1 ]; then
  exit 2
fi


# just remote + dir
node $PUSH_DIR origin build
if [ $? -ne 1 ]; then
  exit 3
fi


# empty branch
node $PUSH_DIR build:
if [ $? -ne 1 ]; then
  exit 4
fi


# colon branch
node $PUSH_DIR build::
if [ $? -ne 1 ]; then
  exit 5
fi
