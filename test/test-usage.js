var fs = require('fs');
var path = require('path');

var util = require('./util.js');


util.test('test usage', function (t) {
  var usage = path.join(__dirname, '..', 'bin', 'usage.txt');
  var usageText = String(fs.readFileSync(usage));

  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  var readmeUsageText = /```usage\n([\s\S]*?)```/.exec(readmeText)[1];

  t.equal(usageText, readmeUsageText);
  t.end();
});
