# push-dir

[![Version][version-badge]][version-href]
[![Build status][build-badge]][build-href]

`git push`, but for directories

* No messing around with `.gitignore` (no need to commit the directory)
* Perfect for pushing a `dist`/`build` directory to `gh-pages`

## install

```
npm install push-dir
```

## example

```
push-dir build:gh-pages
```

## usage

```usage
usage: push-dir [remote] <dir>:<branch> [options...]

required:

  dir
    the directory whose contents will be pushed to <branch>

  branch
    the remote branch to push to

optional:

  remote
    the git remote to push to
    default: origin

  --no-preserve-history
    discard all previous commits on <branch> when pushing
    usually used with --force option
    default: false

  --force, -f
    force push to the remote branch
    default: false

  --message, -m
    the commit message
    default: the most recent commit hash

  --preserve-local-temp-branch
    keep the local temp branch after pushing
    default: false

  --help, -h
    display this message
```


[version-badge]: https://img.shields.io/npm/v/push-dir.svg
[version-href]: https://www.npmjs.com/package/push-dir

[build-badge]: https://travis-ci.org/L33T-KR3W/push-dir.svg?branch=master
[build-href]: https://travis-ci.org/L33T-KR3W/push-dir
