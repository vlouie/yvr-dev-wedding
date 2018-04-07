// ADD THIS PART TO YOUR CODE
//"use strict";

//var documentClient = require("documentdb").DocumentClient;
//var config = require("./config");
//var url = require('url');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('request');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/server/rsvp', (req, res) => {
    console.log(req.body);
});

app.get('/server/authorize_spotify', (req, res) => {
  let response = {
    token: '',
    type: ''
  };
    //https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
  const client_id = '478187d491ff43da8526fb138d8fce7e';
  const secret = 'e98ec1264b1647dc99906f3361e7a04a';
  const thing = `${client_id}:${secret}`;
  const auth = `Basic ${new Buffer(thing).toString('base64')}`;
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
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
