var util = require('./util.js');


util.test('test works - no preserve history', function (t) {
  var cmds = util.fixtureTestCommands('test-works-no-preserve-history.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
