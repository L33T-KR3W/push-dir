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
        console.log('pushing anyway') : Promise.reject('git unclean');
    })
    .then(checkoutOrphanBranch.bind(null, directory, local))
    .then(commitAndPush.bind(null, directory, remote, message))
    .then(resetBranch)
    .catch(handleError);
}

function checkIfClean() {
  return new Promise(function(resolve, reject) {
    exec('git status --porcelain', function (error, stdout, stderr) {
      var gitClean = !(error || stdout.length || stderr.length);
      gitClean ? resolve() : reject('not clean');
    });
  });
}

function resetBranch() {
  return new Promise(function(resolve, reject) {
    exec('git checkout - -f', function(error, stdout, stderr) {
      error ? reject('problem resetting branch') : resolve();
    });
  });
}

function commitAndPush(directory, remote, message) {
  console.log('asdfasdfqqqq');
  var cmd = [
    'git --work-tree ' + directory + ' add --all',
    'git --work-tree ' + directory + ' commit -m "' + message + '"',
    'git push origin HEAD:' + remote + ' --force'
  ].join(' && ');

  console.log('asfasdf');

  return new Promise(function(resolve, reject) {
    exec(cmd, function(error, stdout, stderr) {
      console.log('no buenisimo', stdout, stderr);
      error ? reject('no bueno') : resolve();
    });
  }); 
}

function checkoutOrphanBranch(directory, branch) {
  var cmd = 'git --work-tree ' + directory + ' checkout --orphan ' + branch;
  return new Promise(function(resolve, reject) {
    exec(cmd, function (error, stdout, stderr) {
      error ? reject('could not checkout orphan branch') : resolve();
    });
  });
}

function deleteLocalBranch(branch) {
  var cmd = 'git branch -D ' + branch;
  return new Promise(function(resolve, reject) {
    exec(cmd, function (error, stdout, stderr) {
      resolve();
    });
  });
}

function noLocalBranchConflict(branch) {
  var cmd = 'git branch --list ' + branch;
  return new Promise(function(resolve, reject) {
    exec(cmd, function (error, stdout, stderr) {
      var noConflict = !(error || stdout.length || stderr.length);
      noConflict ? resolve() : reject();
    });
  });
}

function getLastCommitHash() {
  return new Promise(function(resolve, reject) {
    exec('git rev-parse --short HEAD', function (error, stdout, stderr) {
      error ? reject(error) : resolve(stdout);
    });
  });
}

function handleError(error) {
  console.error('aborted');
  console.error(error);
}
