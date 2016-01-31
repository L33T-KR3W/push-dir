var test = require('tape');
var exec = require('child_process').exec;


test('test abort - staged changes', function (t) {
  var cmds = fixtureTestCommands('test-abort-staged-changes.sh');
  exec(cmds, shouldFailWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});

test('test abort - unstaged changes', function (t) {
  var cmds = fixtureTestCommands('test-abort-unstaged-changes.sh');
  exec(cmds, shouldFailWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});

test('test abort - untracked files', function (t) {
  var cmds = fixtureTestCommands('test-abort-untracked-files.sh');
  exec(cmds, shouldFailWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});

test('test abort - branch exists', function (t) {
  var cmds = fixtureTestCommands('test-abort-branch-exists.sh');
  exec(cmds, shouldFailWithMessage.bind(null, t, 'local branch with name already exists'));
  t.plan(2);
});

test('test works', function (t) {
  var cmds = fixtureTestCommands('test-works.sh');
  exec(cmds, shouldWork.bind(null, t));
  t.plan(1);
});

test('test works - allow unclean', function (t) {
  var cmds = fixtureTestCommands('test-works-allow-unclean.sh');
  exec(cmds, shouldWork.bind(null, t));
  t.plan(1);
});


function fixtureTestCommands(fixture) {
  return commands(
    'PD_ROOT=$(pwd)',
    'cd $PD_ROOT/test',
    'rm -rf fixture-working',
    'rm -rf fixture-remote',
    'cp -r fixture fixture-working',
    'cd $PD_ROOT/test/fixture-working',
    'echo "\nnow in $(pwd)"',
    'git init',
    'git add .',
    'git commit -m "initial commit"',
    'cp -r ../fixture-working ../fixture-remote',
    'echo "RUNNING TEST.JS-----------"',
    'PUSH_DIR=$PD_ROOT/bin/push-dir.js ./' + fixture,
    'cd $PD_ROOT/test'
  );
}

function shouldFailWithMessage(t, errorMessage, error, stdout, stderr) {
  log(stdout, stderr);
  t.equal(error, null);
  t.equal(stderr, formatExpectedStdout(errorMessage));
  t.end();
}

function shouldWork(t, error, stdout, stderr) {
  log(stdout, stderr);
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

function formatExpectedStdout(message) {
  return 'aborted: ' + message + '\n';
}

function log(stdout, stderr) {
  var line = '=============';
  console.log(line, 'stdout', line, '\n', stdout, '\n\n');
  console.log(line, 'stderr', line, '\n', stderr, '\n\n');
}
