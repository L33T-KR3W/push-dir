var util = require('./util.js');


util.test('test works - preserve', function (t) {
  var cmds = util.fixtureTestCommands('test-works-preserve.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
