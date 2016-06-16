var util = require('./util.js');


util.test('test abort - untracked files', function (t) {
  var cmds = util.fixtureTestCommands('test-abort-untracked-files.sh');
  util.exec(cmds, util.shouldFailWithMessage.bind(null, t, 'aborted: git not clean\n'));
  t.plan(2);
});
