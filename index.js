var exec = require('child_process').exec;

module.exports = pushDir;

function pushDir(dir, remoteBranch, options) {
  return getLastCommitInfo()
    .then(function(info) {
      var hash = info.hash;
      var message = options.message || hash;
      var detachedHead = info.branch === '';
      var originalBranch = detachedHead ? hash : info.branch;

      var now = Date.now();
      var remote = options.remote || 'origin';
      var localBranch = remoteBranch + '-' + hash + '-' + now;
      var localRemoteBranch = remote + '/' + remoteBranch + '-' + now;
      var cleanup = !options.keep;
      var remoteBranchExists = false;

      return Promise.resolve()
        .then(checkIfClean)
        .then(noLocalBranchConflict.bind(null, localBranch))
        .then(checkoutOrphanBranch.bind(null, dir, localBranch))
        .then(addDir.bind(null, dir))
        .then(commitDir.bind(null, dir, message))
        .then(function() {
          if (options.discardHistory) return;
          return Promise.resolve()
            .then(fetchRemoteBranch.bind(null, localRemoteBranch, remote, remoteBranch))
            .then(checkoutRemoteBranch.bind(null, localRemoteBranch, remote, remoteBranch))
            .then(function() { remoteBranchExists = true; })
            .then(mergeDirIntoRemote.bind(null, localBranch, message))
            .catch(function() {});
        })
        .then(pushDirToRemote.bind(null, remote, remoteBranch, options.force))
        .catch(function(error) {
          resetBranch(originalBranch, detachedHead);
          handleError(error);
        })
        .then(resetBranch.bind(null, originalBranch, detachedHead))
        .then(cleanup ? deleteLocalBranch.bind(null, localBranch) : null)
        .then(remoteBranchExists ? deleteLocalRemoteBranch.bind(null, localRemoteBranch) : null);
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
  return Promise.resolve()
    .then(function() {
      return execCmd(
        'git symbolic-ref --quiet HEAD',
        'problem getting current branch'
      )
      .catch(function() { return ''; });
    })
    .then(function(ref) {
      var regex = new RegExp('^refs\/heads\/');
      return ref.replace(regex, '');
    });
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
  var escaped = escapeSingle(message);
  return execCmd(
    'git --work-tree ' + directory + ' commit -m \'' + escaped + '\'',
    'problem committing directory to local branch'
  );
}

function pushDirToRemote(remote, remoteBranch, force) {
  return execCmd(
    'git push ' + remote + ' HEAD:' + remoteBranch + (force ? ' --force' : ''),
    'problem pushing local branch to remote'
  );
}

function checkoutOrphanBranch(directory, branch) {
  return execCmd(
    'git --work-tree ' + directory + ' checkout --orphan ' + branch,
    'problem creating local orphan branch'
  );
}

function fetchRemoteBranch(branch, remote, remoteBranch) {
  return execCmd(
    'git fetch --depth 1 ' + remote + ' ' + remoteBranch,
    'problem fetching remote branch'
  );
}

function checkoutRemoteBranch(branch, remote, remoteBranch) {
  return execCmd(
    'git checkout -b ' + branch + ' ' + remote + '/' + remoteBranch,
    'problem checking out remote branch'
  );
}

function mergeDirIntoRemote(localBranch, message) {
  var escaped = escapeSingle(message);
  return execCmd(
    'git merge ' + localBranch + ' -m \'' + escaped + '\'',
    'problem merging orphan into local remote'
  );
}

function deleteLocalBranch(branch) {
  return execCmd(
    'git branch -D ' + branch,
    'problem deleting local branch'
  );
}

function deleteLocalRemoteBranch(branch) {
  return execCmd(
    'git branch -D ' + branch,
    'problem deleting local remote branch'
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
      getCurrentBranch(),
    ])
    .then(function(info) {
      info = info.map(function(s) { return s.trim(); });
      return {
        hash: info[0],
        branch: info[1],
      };
    });
}

function getLastCommitHash() {
  return execCmd(
    'git rev-parse HEAD',
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

var single = /'/g;
function escapeSingle(str) {
  return str.replace(single, '\'"\'"\'');
}
