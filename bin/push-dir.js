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

var numArgs = argv._.length;

if (argv.help) {
  showUsage().on('end', function() {
    process.exit(0);
  });
}
else if (!numArgs || numArgs > 2) {
  showUsage().on('end', function() {
    process.exit(1);
  });
}
else {
  var remoteSpecified = numArgs === 2;
  var dirBranch = remoteSpecified ? argv._[1] : argv._[0];
  var dir = dirBranch.split(':').slice(0, -1).join(':');
  var branch = dirBranch.split(':').slice(-1)[0];

  pushDir(dir, branch, {
    remote: remoteSpecified ? argv._[0] : undefined,
    preserveLocalTempBranch: argv['preserve-local-temp-branch'],
    message: argv['message']
  });
}

function showUsage() {
  var fs = require('fs');
  var path = require('path');
  var usage = fs.createReadStream(path.join(__dirname, 'usage.txt'));
  usage.pipe(process.stdout);
  return usage;
}
