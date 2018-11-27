var
  express = require('express'),
  request = require('request'),
  http = require('http');

var app = express();

app.use(express.static('./'));
global.config = require('./config')[app.get('env')]; // Environment config

app.get('/sso', function (req, res) {
  request({
    url: `${config.booqitApi}api/v1/sso/generate-link`,
    method: 'GET',
    headers: {
      authorization: `key ${config.apiKey}`,
    },
    json: {
      firstName: 'Lily',
      lastName: 'Doe',
      internalNumber: '123456',
      roles: {
        user: true
      }, // Or admin: true
      language: 'en' // Or 'nl', 'fr'
    }
  }, (err, responseObj, body) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (responseObj.statusCode !== 200) {
      return res.status(500).json(body || 'Invalid request');
    }
    if (responseObj.statusCode !== 200 || !body) {
      return res.status(responseObj.statusCode).json(body);
    }
    if (body.data.ssoUrl) {
      return res.redirect(body.data.ssoUrl);
    } else {
      return res.status(200).json(body);
    }
  });
});

const server = http.createServer(app);
server.listen(2882);