var util = require('./util.js');


util.test('test works - preserve local temp branch flag', function (t) {
  var cmds = util.fixtureTestCommands('test-works-preserve.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
