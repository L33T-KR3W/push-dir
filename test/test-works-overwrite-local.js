var util = require('./util.js');


util.test('test works - overwrite local', function (t) {
  var cmds = util.fixtureTestCommands('test-works-overwrite-local.sh');
  util.exec(cmds, util.shouldWork.bind(null, t));
  t.plan(1);
});
