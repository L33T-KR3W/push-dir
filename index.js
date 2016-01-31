const exec = require('child_process').exec;

module.exports = pushDir;

function pushDir(opts) {
  getLastCommitHash().then(function(hash) {
    push(opts.dir, opts.branch + '-' + hash, opts.branch, hash, opts.force);
  }, handleError);
}

function push(directory, local, remote, message, force) {
  checkIfClean()
    .catch(function onUnclean() {
      return force ?
        console.log('ignoring unclean git...') : Promise.reject('git unclean');
    })
    .then(checkoutOrphanBranch.bind(null, directory, local))
    .then(addDir.bind(null, directory))
    .then(commitDir.bind(null, directory, message))
    .then(pushDirToRemote.bind(null, remote))
    .then(resetBranch)
    .catch(handleError);
}

function checkIfClean() {
  return expectOutputEmpty(
    'git status --porcelain',
    'git not clean'
  );
}

function resetBranch() {
  return getOutput(
    'git checkout - -f',
    'problem resetting branch'
  );
}


function addDir(directory) {
  return getOutput(
    'git --work-tree ' + directory + ' add --all',
    'problem adding directory to local branch'
  );
}

function commitDir(directory, message) {
  return getOutput(
    'git --work-tree ' + directory + ' commit -m "' + message + '"',
    'problem committing directory to local branch'
  );
}

function pushDirToRemote(remote) {
  return getOutput(
    'git push origin HEAD:' + remote + ' --force',
    'problem pushing local =branch to remote'
  );
}

function checkoutOrphanBranch(directory, branch) {
  return getOutput(
    'git --work-tree ' + directory + ' checkout --orphan ' + branch,
    'problem creating local orphan branch'
  );
}

function deleteLocalBranch(branch) {
  return getOutput(
    'git branch -D ' + branch,
    'problem deleting local branch'
  );
}

function noLocalBranchConflict(branch) {
  return expectOutputEmpty(
    'git branch --list ' + branch,
    'local branch with name already exists'
  );
}

function getLastCommitHash() {
  return getOutput(
    'git rev-parse --short HEAD',
    'problem getting last commit hash'
  );
}

/**
 * Helpers
 */

function handleError(err) {
  console.error('aborted: ', err);
}

function getOutput(cmd, errMessage) {
  return new Promise(function(resolve, reject) {
    exec(cmd, function (error, stdout, stderr) {
      error ? reject(errMessage) : resolve(stdout);
    });
  });
}

function expectOutputEmpty(cmd, errMessage) {
  return new Promise(function(resolve, reject) {
    exec(cmd, function (error, stdout, stderr) {
      (error || stdout.length || stderr.length) ? reject(errMessage) : resolve();
    });
  });
}
