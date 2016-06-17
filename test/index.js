var fs = require('fs');
var path = require('path');


fs.readdirSync(__dirname)
  .filter(function(file) { return file.indexOf('test-') === 0; })
  .forEach(function(file) { require(path.join(__dirname, file)); });
