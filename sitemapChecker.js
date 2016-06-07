var FS = require('fs');
var Xml2js = require('xml2js');
var Webshot = require('webshot');
var ProgressBar = require('progress');
const Url = require('url');

var _save = function(urls, progress) {
  if (urls.length > 0) {
    var url = urls.shift();
    var path = Url.parse(url).path;
    
    progress.tick({path: path});
    
    var options = {
      windowSize: { width: 1200},
      shotSize: { width: 'all', height: 'all' }  
    }
    
    Webshot(url + '?_escaped_fragment_=', 'screenshots' + path + '.png', options, function(err) {
      if (err) console.error('(!) Cannot load url', path);
      _save(urls, progress);
    });
  }
}

FS.readFile(__dirname + '/sitemap.xml', function(err, data) {
  var parser = new Xml2js.Parser();
  parser.parseString(data, function (err, result) {
    var urls = result.urlset.url.map(function(item) {
      return item.loc[0];
    });
    
    var progress = new ProgressBar('[:bar] :percent :current: :path ', {total: urls.length, width: 20});
    
    _save(urls, progress);
  });
});
