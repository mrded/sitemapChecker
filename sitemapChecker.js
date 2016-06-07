var fs = require('fs');
var xml2js = require('xml2js');
var webshot = require('webshot');

var base_url = 'http://example.com';

var _save = function(paths) {
  if (paths.length > 0) {
    var path = paths.shift();
    var url = base_url + path + '?_escaped_fragment_=';
    
    console.log('Requesting', path);
    
    var options = {
      renderDelay: 1000,
      windowSize: { width: 1200},
      shotSize: { width: 'window', height: 'window' }  
    }
    
    
    webshot(url, 'screenshots' + path + '.png', options, function(err) {
      if (err) console.error('(!) Cannot load url', path);
      _save(paths);
    });
  }
}

fs.readFile(__dirname + '/sitemap.xml', function(err, data) {
  var parser = new xml2js.Parser();
  parser.parseString(data, function (err, result) {
    _save(result.urlset.url.map(function(item) {
      return item.loc[0].replace(base_url, '');
    }));
  });
});
