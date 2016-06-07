var fs = require('fs');
var xml2js = require('xml2js');
var webshot = require('webshot');
var progressBar = require('progress');

var base_url = 'http://example.com';

var _save = function(paths, progress) {
  if (paths.length > 0) {
    var path = paths.shift();
    var url = base_url + path + '?_escaped_fragment_=';
    
    progress.tick({path: path});
    
    var options = {
      renderDelay: 1000,
      windowSize: { width: 1200},
      shotSize: { width: 'all', height: 'all' }  
    }
    
    webshot(url, 'screenshots' + path + '.png', options, function(err) {
      if (err) console.error('(!) Cannot load url', path);
      _save(paths, progress);
    });
  }
}

fs.readFile(__dirname + '/sitemap.xml', function(err, data) {
  var parser = new xml2js.Parser();
  parser.parseString(data, function (err, result) {
    var paths = result.urlset.url.map(function(item) {
      return item.loc[0].replace(base_url, '');
    });
    
    var progress = new progressBar('[:bar] :percent :current: :path ', {total: paths.length, width: 20});
    
    _save(paths, progress);
  });
});
