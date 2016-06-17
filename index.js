var exec = require('child_process').exec;

module.exports = pushDir;

function pushDir(dir, branch, options) {
  return getLastCommitInfo()
    .then(function(info) {
      var hash = info.hash;
      var detachedHead = info.branch === '';
      var originalBranch = detachedHead ? hash : info.branch;

      var local = branch + '-' + hash;
      var remote = options.remote || 'origin';
      var cleanup = !options.preserveLocalTempBranch;

      return Promise.resolve()
        .then(checkIfClean)
        .then(noLocalBranchConflict.bind(null, local))
        .then(checkoutOrphanBranch.bind(null, dir, local))
        .then(addDir.bind(null, dir))
        .then(commitDir.bind(null, dir, hash))
        .then(pushDirToRemote.bind(null, remote, branch))
        .then(resetBranch.bind(null, originalBranch, detachedHead))
        .then(cleanup ? deleteLocalBranch.bind(null, local) : null);
    })
    .catch(handleError);
}

/**
 * Tasks
 */

function checkIfClean() {
  return expectOutputEmpty(
    'git status --porcelain',
    'git not clean'
  );
}

/**
 * Returns name of current branch or empty string if detached HEAD
 * @return {string} - name of current branch
 */
function getCurrentBranch() {
  return execCmd(
    'git symbolic-ref HEAD -q | sed -e "s/^refs\\/heads\\///"',
    'problem getting current branch'
  );
}

function resetBranch(branch, detach) {
  var detached = detach ? '--detach ' : '';
  return execCmd(
    'git checkout -f ' + detached + branch,
    'problem resetting branch'
  );
}

function addDir(directory) {
  return execCmd(
    'git --work-tree ' + directory + ' add --all',
    'problem adding directory to local branch'
  );
}

function commitDir(directory, message) {
  return execCmd(
    'git --work-tree ' + directory + ' commit -m "' + message + '"',
    'problem committing directory to local branch'
  );
}

function pushDirToRemote(remote, remoteBranch) {
  return execCmd(
    'git push ' + remote + ' HEAD:' + remoteBranch + ' --force',
    'problem pushing local branch to remote'
  );
}

function checkoutOrphanBranch(directory, branch) {
  return execCmd(
    'git --work-tree ' + directory + ' checkout --orphan ' + branch,
    'problem creating local orphan branch'
  );
}

function deleteLocalBranch(branch) {
  return execCmd(
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

function getLastCommitInfo() {
  return Promise
    .all([
      getLastCommitHash(),
      getCurrentBranch()
    ])
    .then(function(info) {
      info = info.map(function(s) { return s.trim(); });
      return {
        hash: info[0],
        branch: info[1]
      };
    });
}

function getLastCommitHash() {
  return execCmd(
    'git rev-parse --short HEAD',
    'problem getting last commit hash'
  );
}

/**
 * Helpers
 */

function handleError(err) {
  console.error('aborted:', err);
  process.exit(1);
}

function execCmd(cmd, errMessage) {
  return new Promise(function(resolve, reject) {
    exec(cmd, function(error, stdout, stderr) {
      error ? reject(errMessage) : resolve(stdout);
    });
  });
}

function expectOutputEmpty(cmd, errMessage) {
  return new Promise(function(resolve, reject) {
    exec(cmd, function(error, stdout, stderr) {
      (error || stdout.length || stderr.length) ? reject(errMessage) : resolve();
    });
  });
}
