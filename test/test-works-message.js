var util = require('./util.js');


util.test('test works - message', function (t) {
  var cmds = util.fixtureTestCommands('test-works-message.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
