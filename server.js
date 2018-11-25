var 
  express = require('express'),
  http = require('http');

var app = express();

app.use(express.static('./'));

app.get('/sso', function (req, res) {
  res.send('We zijn er!!!!');
});

const server = http.createServer(app);
server.listen(2882);