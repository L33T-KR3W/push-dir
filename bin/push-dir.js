#!/usr/bin/env node

var pushDir = require('../index.js');


var opts = {
  boolean: [
    'preserve-local-temp-branch',
    'help',
  ],
  alias: {
    'help': 'h',
  },
};
var args = require('minimist')(process.argv.slice(2), opts);

var al = args._.length;
if (args.help) showUsage(0);
if (!al || al > 2) showUsage(1);

var remoteSpecified = args._.length === 2;
var dirBranch = remoteSpecified ? args._[1] : args._[0];
var dir = dirBranch.split(':').slice(0, -1).join(':');
var branch = dirBranch.split(':').slice(-1)[0];
var options = {
  remote: remoteSpecified ? args._[0] : undefined,
  preserveLocalTempBranch: args['preserve-local-temp-branch'],
};

pushDir(dir, branch, options);


function showUsage(exitCode) {
  var fs = require('fs');
  var path = require('path');
  var readme = path.join(__dirname, 'usage.txt');
  fs.createReadStream(readme).pipe(process.stdout);
  process.exit(exitCode);
}
