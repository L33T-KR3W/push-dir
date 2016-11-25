# push-dir

[![Version][version-badge]][version-href]
[![Build status][build-badge]][build-href]

Push the contents of a directory to a remote branch

* No messing around with `.gitignore` (no need to commit the directory)
* Perfect for pushing a `dist`/`build` directory to `gh-pages`

## install

```
npm install push-dir
```

## example

```
push-dir --dir=build --branch=gh-pages
```

## usage

```
Usage: push-dir {OPTIONS}

Required Options:

--dir
The name of the directory whose contents will be committed to branch

--branch
The name of the remote branch to push to

Advanced Options:

--remote
The name of the remote to push to (defaults to origin)

--cleanup
Whether to delete the local branch after creating

--local-branch-name
Force the name of the local branch that is pushed to the remote branch

--allow-unclean
Whether to attempt push even if git unclean

--overwrite-local
Whether to override a local branch of the same name, if exists

--force
Alias for both --allow-unclean and --overwrite-local

--verbose
Display stdout and stderr from internal commands
```


[version-badge]: https://img.shields.io/npm/v/push-dir.svg
[version-href]: https://www.npmjs.com/package/push-dir

[build-badge]: https://travis-ci.org/L33T-KR3W/push-dir.svg?branch=master
[build-href]: https://travis-ci.org/L33T-KR3W/push-dir
