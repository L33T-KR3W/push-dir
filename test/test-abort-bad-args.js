var util = require('./util.js');


util.test('test abort - bad args', function (t) {
  var cmds = util.fixtureTestCommands('test-abort-bad-args.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
