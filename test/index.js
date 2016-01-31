var test = require('tape');
var path = require('path');
var execSync = require('child_process').execSync;

var FIXTURE_PATH = path.join(process.cwd(), 'test', 'fixtures', 'test-repo');
var HASH = 'fe9f4ce';

test('test commit hash of fixture ok', function (t) {
  var res = execSync('git rev-parse --short HEAD', {
    cwd: FIXTURE_PATH
  });
  t.equal(res.toString().trim(), HASH, 'hash matches');
  t.end();
});
