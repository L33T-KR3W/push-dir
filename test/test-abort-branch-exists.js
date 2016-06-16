var util = require('./util.js');


util.test('test abort - branch exists', function (t) {
  var cmds = util.fixtureTestCommands('test-abort-branch-exists.sh');
  util.exec(cmds, util.shouldFailWithMessage.bind(null, t, 'aborted: local branch with name already exists\n'));
  t.plan(2);
});
