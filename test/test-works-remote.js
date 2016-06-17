var util = require('./util.js');


util.test('test works - remote', function (t) {
  var cmds = util.fixtureTestCommands('test-works-remote.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
