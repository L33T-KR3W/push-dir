var util = require('./util.js');


util.test('test abort - unstaged changes', function (t) {
  var cmds = util.fixtureTestCommands('test-abort-unstaged-changes.sh');
  util.exec(cmds, util.shouldFailWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});
