var webshot = require('webshot');

webshot('google.com', 'screenshots/google.png', function(err) {
  // screenshot now saved to google.png
});