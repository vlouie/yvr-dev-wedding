// ADD THIS PART TO YOUR CODE
//"use strict";

//var documentClient = require("documentdb").DocumentClient;
//var config = require("./config");
//var url = require('url');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('request');
const azure = require('azure-storage');
const tableSvc = azure.createTableService('vivivivibabybabybaby', 'NXSC5iB5a+KZrXSsMpm/dpNDMURwAYL1YlTqxooqoFXNZm11rPuZLaF8uvzxCyZW04bF04lIDsqug3xU5dIkuA==');

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
  var rsvpResponse = req.body;
  // TODO: switch back to the LEGIT table when go-live
  tableSvc.createTableIfNotExists('rsvpTEST', function(error, result, response){
    if(!error){
      // Table exists or created
      var entGen = azure.TableUtilities.entityGenerator;
      var entry = {
        PartitionKey: entGen.String('rsvps'),
        RowKey: entGen.String(Date.now().toString()),
        name: entGen.String(rsvpResponse.name),
        email: entGen.String(rsvpResponse.email),
        going: entGen.String(rsvpResponse.going),
        name2: entGen.String(rsvpResponse.name2),
        vegan: entGen.String(rsvpResponse.vegan),
        gluten: entGen.String(rsvpResponse.gluten),
        allergies: entGen.String(rsvpResponse.allergies),
        date: entGen.DateTime(new Date()),
      };
      let response = { success: true };
      tableSvc.insertEntity('rsvpTEST', entry, {echoContent: true}, function (error, result, response) {
        if(!error){
          // Entity inserted
          res.send(response);
        } else {
          response.success = false;
          res.send(response);
        }
      });
    }
  });
});

app.get('/server/authorize_spotify', function(req, res) {

  const client_id = '478187d491ff43da8526fb138d8fce7e';
  const client_secret = 'e98ec1264b1647dc99906f3361e7a04a';
  // requesting access token from refresh token
  const refresh_token = 'AQBySpAK6_IggUl3rUJJKMu9ASQrbqee8HZ09RxjP0g_PwReER-1_qTj7huxFbUIJ2WRfoLLey6yzKa4RqdrhKyFLIjEFTj4kHx0HIt5Ze9kXRzDlNB7pWE-tZvCw-qApTw';
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      scope: 'playlist-modify-public playlist-modify-private user-read-private user-read-email'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.post('/server/fuck', function(req, res) {
  let stuff = req.body;

  const playlist_id = '5BjGI2u53v2U4jSWML9FNT';
  const user_id = 'delusionelle';
  const url = 'https://api.spotify.com/v1/users/' +
    user_id + '/playlists/' + playlist_id + '/tracks?uris=' + stuff.uri;

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + stuff.token
  };

  var options = {
    url: url,
    method: 'POST',
    headers: headers
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 201) {
      res.send({ 'success': true });
    } else {
      console.log('Error! Status code: ', response.statusCode);
    }
  }

  request(options, callback);
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
