const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('request');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/server/authorize_spotify', (req, res) => {
  let response = {
    token: '',
    type: ''
  };
  const client_id = '478187d491ff43da8526fb138d8fce7e';
  const secret = 'e98ec1264b1647dc99906f3361e7a04a';
  const thing = `${client_id}:${secret}`;
  const auth = `Basic ${new Buffer(thing).toString('base64')}`;
  //const auth = 'Basic '+ thing;
  request.post('https://accounts.spotify.com/api/token',
     {
       form: {
         grant_type: 'client_credentials'
       },
       headers: { Authorization: auth }
     }, function(err, resp, body) {
     if (!err && resp.statusCode === 200) {
       console.log(body);
       var info = JSON.parse(body);
       response.token = info.access_token;
       response.type = info.token_type;
       res.send(response);
     }
  });
  //res.send(response);
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
