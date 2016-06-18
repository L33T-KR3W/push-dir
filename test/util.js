var exec = require('child_process').exec;
var path = require('path');
var test = require('tape');


module.exports = {
  test: test,
  exec: exec,
  fixtureTestCommands: fixtureTestCommands,
  shouldFailWithMessage: shouldFailWithMessage,
  shouldWork: shouldWork,
  commands: commands,
  flatten: flatten,
  log: log,
};


function fixtureTestCommands(fixture) {
  var root = path.join(__dirname, '..');
  return commands(
    'PD_ROOT=' + root,
    'cd $PD_ROOT/test',
    'rm -rf fixture-working',
    'rm -rf fixture-remote',
    'cp -r fixture fixture-working',
    'cd $PD_ROOT/test/fixture-working',
    'git init',
    'git config --local user.email "goose@l33t-kr3w.com"',
    'git config --local user.name "Goose"',
    'git add .',
    'git commit -m "initial commit"',
    'cp -r ../fixture-working ../fixture-remote',
    'PUSH_DIR=$PD_ROOT/bin/push-dir.js ./' + fixture
  );
}

function shouldFailWithMessage(t, errorMessage, error, stdout, stderr) {
  // log(stdout, stderr);
  t.equal(error, null);
  t.equal(stderr, errorMessage);
  t.end();
}

function shouldWork(t, error, stdout, stderr) {
  // log(stdout, stderr);
  t.equal(error, null);
  t.end();
}

function commands() {
  var cmds = flatten(Array.prototype.slice.call(arguments));
  return cmds.join(' && \\\n');
}

function flatten(array) {
  return array.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

function log(stdout, stderr) {
  var line = '=============';
  console.log(line, 'stdout', line, '\n', stdout, '\n\n');
  console.log(line, 'stderr', line, '\n', stderr, '\n\n');
}
