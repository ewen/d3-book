var express = require('express');
var fs = require('fs');

var app = express();

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  var chapters = fs.readdirSync('.').filter(function (file) {
    return (fs.statSync(file).isDirectory() && /^chapter_(\d+)$/.test(file));
  })
  .map(function (dir) {
    var chapter = {
      name: dir.replace('chapter_', 'Chapter ')
    };
    chapter.examples = fs.readdirSync(dir).filter(function (file) {
      return /.*\.html/.test(file);
    })
    .map(function (file) {
      return {
        name: file.replace('.html', '').replace(/_/g, ' '),
        link: [dir, file].join('/')
      };
    });
    return chapter;
  });

  res.render('index', {'chapters': chapters});
});

app.use(express.static(__dirname));

var port = 3000;
app.listen(port);
console.log('Server started at http://localhost:' + port + '/');
