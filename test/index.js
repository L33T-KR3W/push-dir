var test = require('tape');
var exec = require('child_process').exec;


test('test abort - staged changes', function (t) {
  var cmds = fixtureTestCommands('test-abort-staged-changes.sh');
  exec(cmds, shouldAbortWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});


test('test abort - unstaged changes', function (t) {
  var cmds = fixtureTestCommands('test-abort-unstaged-changes.sh');
  exec(cmds, shouldAbortWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});


test('test abort - untracked files', function (t) {
  var cmds = fixtureTestCommands('test-abort-untracked-files.sh');
  exec(cmds, shouldAbortWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});


test('test abort - branch exists', function (t) {
  var cmds = fixtureTestCommands('test-abort-branch-exists.sh');
  exec(cmds, shouldAbortWithMessage.bind(null, t, 'local branch with name already exists'));
  t.plan(2);
});


test('test works', function (t) {
  var cmds = fixtureTestCommands('test-works.sh');
  exec(cmds, shouldWork.bind(null, t, 'should work'));
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


function shouldAbortWithMessage(t, errorMessage, error, stdout, stderr) {
  console.log(stdout, stderr);
  t.notOk(error);
  t.equal(stderr, formatExpectedStdout(errorMessage));
  t.end();
}


function shouldWork(t, error, stdout, stderr) {
  console.log(stdout, stderr);
  t.ok(error);
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