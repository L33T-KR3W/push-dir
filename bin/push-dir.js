#!/usr/bin/env node

var pushDir = require('../index.js');

var opts = require('minimist')(process.argv.slice(2));
pushDir(opts);
