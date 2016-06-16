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

pushDir(args);


function showUsage(exitCode) {
  var fs = require('fs');
  var path = require('path');
  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  var usage = /```usage([\s\S]*?)```/.exec(readmeText)[1].trim();
  console.log(usage);
  process.exit(exitCode);
}
