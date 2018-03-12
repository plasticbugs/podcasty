const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const redis = require('redis');
const client = redis.createClient();
const cache = require('express-redis-cache')({expire: 3600});

const rss = require('./app/utils/feedGen.js');
const VideoController = require('./app/controllers/VideoController.js');
const db = require('./db/config.js');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json


// app.post('/api', VideoController.saveVideos);
app.get('/api', VideoController.retrieveVideos);

app.get('/feed',cache.route(), function(request, response) {
  var uploads = request.query.uploads;
  var channel = request.query.channel;
  console.log('channel & uploads', uploads, channel);
  response.contentType('text/xml')
  rss.generateRSS({channel, uploads}, (rssData) => {
    response.send(rssData);
  });
})

app.get('/*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

module.exports = app;