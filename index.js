var childProcess = require('child_process');

module.exports = pushDir;

function pushDir(opts) {
  getLastCommitInfo().then(function(info) {
    var hash = info.hash;
    var detachedHead = info.branch === '';
    var originalBranch = detachedHead ? hash : info.branch;

    var directory = opts.dir;
    var local = opts.branch + '-' + hash;
    var remote = opts.remote || 'origin';
    var remoteBranch = opts.branch;
    var message = typeof opts.message === 'function' ?
      opts.message(hash) : opts.message || hash;
    var allowUnclean = opts['allow-unclean'] || opts.force;
    var overwriteLocal = opts['overwrite-local'] || opts.force;
    var cleanup = opts.cleanup === undefined ? false : opts.cleanup;
    var verbose = opts.verbose;

    Promise.resolve()
      .then(checkIfClean)
      .catch(function onUnclean(reason) {
        return allowUnclean ?
          console.log('ignoring unclean git...') : Promise.reject(reason);
      })

      .then(noLocalBranchConflict.bind(null, local))
      .catch(function onBranchConflict(reason) {
        return overwriteLocal ?
          overwriteLocalBranch(local, verbose) : Promise.reject(reason);
      })

      .then(checkoutOrphanBranch.bind(null, directory, local, verbose))
      .then(addDir.bind(null, directory, verbose))
      .then(commitDir.bind(null, directory, message, verbose))
      .then(pushDirToRemote.bind(null, remote, remoteBranch, verbose))
      .then(resetBranch.bind(null, originalBranch, detachedHead, verbose))
      .then(cleanup ? deleteLocalBranch.bind(null, local, verbose) : null)
      .catch(handleError);

  }, handleError);
}

/**
 * Tasks
 */

function overwriteLocalBranch(local, verbose) {
  console.log('will overwite local branch...');
  return deleteLocalBranch(local, verbose);
}

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
function getCurrentBranch(verbose) {
  return Promise.resolve()
    .then(execCmd.bind(null,
      'git',
      ['symbolic-ref', 'HEAD', '-q'],
      'problem getting current branch',
      verbose
    ))
    .catch(function() {
      return '';
    })
    .then(function(result) {
      return result.replace(new RegExp('^refs\/heads\/'), '');
    });
}

function resetBranch(branch, detach, verbose) {
  var detached = detach ? '--detach' : false;
  return execCmd(
    'git',
    ['checkout', '-f', detached, branch].filter(Boolean),
    'problem resetting branch',
    verbose
  );
}

function addDir(directory, verbose) {
  return execCmd(
    'git',
    ['--work-tree', directory, 'add', '--all'],
    'problem adding directory to local branch',
    verbose
  );
}

function commitDir(directory, message, verbose) {
  return execCmd(
    'git',
    ['--work-tree', directory, 'commit', '-m', message],
    'problem committing directory to local branch',
    verbose
  );
}

function pushDirToRemote(remote, remoteBranch, verbose) {
  return execCmd(
    'git',
    ['push', remote, 'HEAD:' + remoteBranch, '--force'],
    'problem pushing local branch to remote',
    verbose
  );
}

function checkoutOrphanBranch(directory, branch, verbose) {
  return execCmd(
    'git',
    ['--work-tree', directory, 'checkout', '--orphan', branch],
    'problem creating local orphan branch',
    verbose
  );
}

function deleteLocalBranch(branch, verbose) {
  return execCmd(
    'git',
    ['branch', '-D', branch],
    'problem deleting local branch',
    verbose
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

function getLastCommitHash(verbose) {
  return execCmd(
    'git',
    ['rev-parse', '--short', 'HEAD'],
    'problem getting last commit hash',
    verbose
  );
}

/**
 * Helpers
 */

function handleError(err) {
  console.error('aborted:', err);
  process.exit(1);
}

function execCmd(cmd, args, errMessage, verbose) {
  return new Promise(function(resolve, reject) {
    verbose ? console.log(cmd, args.join(' ')) : null;
    const proc = childProcess.spawn(cmd, args, { stdio: 'pipe' });
    const stdoutChunks = [];

    proc.stdout.on('data', function(data) {
      stdoutChunks.push(data);
      verbose ? process.stdout.write(data) : null;
    });

    proc.stderr.on('data', function(data) {
      verbose ? process.stderr.write(data) : null;
    });

    proc.on('close', function(code) {
      verbose ? console.log('\n') : null;
      if (code !== 0) reject(errMessage);
      else resolve(Buffer.concat(stdoutChunks).toString());
    });
  });
}

function expectOutputEmpty(cmd, errMessage) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, function(error, stdout, stderr) {
      (error || stdout.length || stderr.length) ? reject(errMessage) : resolve();
    });
  });
}
