#!/usr/bin/env node

var minimist = require('minimist');
var pushDir = require('../index.js');

var argv = minimist(process.argv.slice(2), {
  string: ['message'],
  boolean: ['preserve-local-temp-branch', 'help'],
  alias: {
    'help': 'h',
    'message': 'm'
  }
});

if (argv.help) {
  showUsage();
  process.exit(0);
}

var numArgs = argv._.length;

if (!numArgs || numArgs > 2) {
  showUsage();
  process.exit(1);
}

var remoteSpecified = numArgs === 2;
var dirBranch = remoteSpecified ? argv._[1] : argv._[0];
var dir = dirBranch.split(':').slice(0, -1).join(':');
var branch = dirBranch.split(':').slice(-1)[0];
var options = {
  remote: remoteSpecified ? argv._[0] : undefined,
  preserveLocalTempBranch: argv['preserve-local-temp-branch'],
  message: argv['message']
};

pushDir(dir, branch, options);

function showUsage() {
  var fs = require('fs');
  var path = require('path');

  var usagePath = path.join(__dirname, 'usage.txt');
  var usageText = fs.readFileSync(usagePath);
  process.stdout.write(usageText);
}
