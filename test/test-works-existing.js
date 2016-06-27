var util = require('./util.js');


util.test('test works - existing', function (t) {
  var cmds = util.fixtureTestCommands('test-works-existing.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
