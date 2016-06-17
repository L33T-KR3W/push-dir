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
    the name of the directory whose contents will be pushed to <branch>

  branch
    the name of the remote branch to push to

optional:

  remote
    the name of the remote to push to
    defaults to: origin

  --preserve-local-temp-branch
    keep the local temp branch after pushing
    defaults to: false

  --help, -h
    display this message
```


[version-badge]: https://img.shields.io/npm/v/push-dir.svg
[version-href]: https://www.npmjs.com/package/push-dir

[build-badge]: https://travis-ci.org/L33T-KR3W/push-dir.svg?branch=master
[build-href]: https://travis-ci.org/L33T-KR3W/push-dir
