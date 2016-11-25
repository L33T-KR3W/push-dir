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

test('test works - overwrite local', function (t) {
  var cmds = fixtureTestCommands('test-works-overwrite-local.sh');
  exec(cmds, shouldWork.bind(null, t));
  t.plan(1);
});

test('test works - cleanup', function (t) {
  var cmds = fixtureTestCommands('test-works-cleanup.sh');
  exec(cmds, shouldWork.bind(null, t));
  t.plan(1);
});

test('test works - cleanup detached head', function (t) {
  var cmds = fixtureTestCommands('test-works-cleanup-detached-head.sh');
  exec(cmds, shouldWork.bind(null, t));
  t.plan(1);
});

test('test works - verbose', function (t) {
  var cmds = fixtureTestCommands('test-works-verbose.sh');
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
