var util = require('./util.js');


util.test('test works - cleanup', function (t) {
  var cmds = util.fixtureTestCommands('test-works-cleanup.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
