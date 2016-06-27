var util = require('./util.js');


util.test('test works - force', function (t) {
  var cmds = util.fixtureTestCommands('test-works-force.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
