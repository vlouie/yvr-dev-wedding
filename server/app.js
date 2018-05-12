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
//const tableSvc = azure.createTableService('myaccount', 'myaccesskey');

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
  console.log(rsvpResponse);
  var entGen = azure.TableUtilities.entityGenerator;
  var entry = {
    PartitionKey: entGen.String('rsvps'),
    RowKey: entGen.String('1'),
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
  //tableSvc.insertEntity('mytable', entry, function (error, result, response) {
    //if(!error){
      //// Entity inserted
      //res.send(response);
    //} else {
      //response.success = false;
      //res.send(response);
    //}
  //});
});

//app.get('/server/authorize_spotify', (req, res) => {
  //let response = {
    //token: '',
    //type: ''
  //};
    ////https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
  //const client_id = '478187d491ff43da8526fb138d8fce7e';
  //const secret = 'e98ec1264b1647dc99906f3361e7a04a';
  ////refresh_token = 'AQAVMGxKA_Xe8XkjoPwl01v5Gl9MbIfRtXjOijw3JQFWjuZqUm4UMgIgkdEIgv2UrU54Fjpol62HqkxnAWAyAuCIC8MqM_UuMSslZDFcuz3spDY-Ms5VlulQe-7MrbDKX9M';
  //const thing = `${client_id}:${secret}`;
  //const auth = `Basic ${new Buffer(thing).toString('base64')}`;
  //request.post('https://accounts.spotify.com/api/token',
     //{
       //form: {
         //grant_type: 'client_credentials'
       //},
       //headers: { Authorization: auth }
     //}, function(err, resp, body) {
     //if (!err && resp.statusCode === 200) {
       //console.log(body);
       //var info = JSON.parse(body);
       //response.token = info.access_token;
       //response.type = info.token_type;
       //res.send(response);
     //}
  //});
//});

app.get('/server/authorize_spotify', function(req, res) {

  const client_id = '478187d491ff43da8526fb138d8fce7e';
  const client_secret = 'e98ec1264b1647dc99906f3361e7a04a';
  // requesting access token from refresh token
  const refresh_token = 'AQBySpAK6_IggUl3rUJJKMu9ASQrbqee8HZ09RxjP0g_PwReER-1_qTj7huxFbUIJ2WRfoLLey6yzKa4RqdrhKyFLIjEFTj4kHx0HIt5Ze9kXRzDlNB7pWE-tZvCw-qApTw';
    console.log('FUCK', 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')));
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
      console.log('FUCKFUCKFUCK', body);
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      console.log(access_token);
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.post('/server/fuck', function(req, res) {
  let stuff = req.body;
    console.log(stuff);

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
    //url: 'https://api.spotify.com/v1/users/delusionelle/playlists/5BjGI2u53v2U4jSWML9FNT/tracks?position=0&uris=spotify%3Atrack%3A7tFiyTwD0nx5a1eklYtX2J',
    method: 'POST',
    headers: headers
};
console.log('options', options);

function callback(error, response, body) {
    console.log('fuck this shit', error, response.statusCode);
    if (!error && response.statusCode == 201) {
    console.log('fuck this shit2');
      res.send({
        'success': true
      });
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
