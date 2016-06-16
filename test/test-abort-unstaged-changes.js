var util = require('./util.js');


util.test('test abort - unstaged changes', function (t) {
  var cmds = util.fixtureTestCommands('test-abort-unstaged-changes.sh');
  util.exec(cmds, util.shouldFailWithMessage.bind(null, t, 'aborted: git not clean\n'));
  t.plan(2);
});
