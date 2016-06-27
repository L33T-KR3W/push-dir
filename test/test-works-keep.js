var util = require('./util.js');


util.test('test works - keep', function (t) {
  var cmds = util.fixtureTestCommands('test-works-keep.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
