var util = require('./util.js');


util.test('test works - cleanup detached head', function (t) {
  var cmds = util.fixtureTestCommands('test-works-cleanup-detached-head.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
