var util = require('./util.js');


util.test('test abort - staged changes', function (t) {
  var cmds = util.fixtureTestCommands('test-abort-staged-changes.sh');
  util.exec(cmds, util.shouldFailWithMessage.bind(null, t, 'git not clean'));
  t.plan(2);
});
