var util = require('./util.js');


util.test('test works - discard history', function (t) {
  var cmds = util.fixtureTestCommands('test-works-discard-history.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
