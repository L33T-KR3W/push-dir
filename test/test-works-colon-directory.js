var util = require('./util.js');


util.test('test works - colon directory', function (t) {
  var cmds = util.fixtureTestCommands('test-works-colon-directory.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
