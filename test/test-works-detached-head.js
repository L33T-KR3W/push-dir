var util = require('./util.js');


util.test('test works - detached head', function (t) {
  var cmds = util.fixtureTestCommands('test-works-detached-head.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
