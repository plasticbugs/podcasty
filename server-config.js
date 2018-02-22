var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var db = require('./app/config.js');
var Video = require('./app/models/videos.js');
var async = require('async');
var _ = require('underscore');
var Promise = require('bluebird');
var builder = require('xmlbuilder');
var rss = require('./app/utils/feedGen.js');
var redis = require('redis');
var client = redis.createClient();
var cache = require('express-redis-cache')({expire: 3600});

// PULLY
var pullyLib = require('pully')
var Pully = pullyLib.Pully;
var Presets = pullyLib.Presets
 
var pully = new Pully();
 
// var pullyOptions = {
//   dir: './bitbucket',
//   preset: Presets.MP3,
//   progress: (data) => console.log(data.percent + '%'),
//   path: path.resolve(__dirname, './') // Progress reporter callback...
// };
// END PULLY

var saveVideos = function(channel, array) {
  if(array.length > 0) {
    var id = array[0].snippet.resourceId.videoId;
    array.shift();
    Video.findOne({videoid: id}, function(err, video){
      console.log("looking for ", id, " and got ", video)
      if (video && video.percent !== '100%') {
        video.remove();
        video = null;
      }
      if (video === null) {
        var newVideo = new Video({percent: "0%", videoid: id, done: false, channel: channel});
        newVideo.save(function(err) {

          var pullyOptions = {
            dir: './public/bitbucket',
            template: '${id}',
            preset: Presets.MP3,
            progress: function(data){
              newVideo.percent = data.percent + '%';
              newVideo.save();
              console.log(data.percent + '%')
            }, 
            path: path.resolve(__dirname, './') // Progress reporter callback...
          };
          console.log("inside LOOP: ", id);
          pullyOptions.url = 'http://www.youtube.com/watch?v=' + id;
          pully.download(pullyOptions).then(
            place => console.log('Downloaded to ' + place.path), // Path to the downloaded file
            err => console.error(err) // Error info
          )
          .then(function(){
            newVideo.done = true;
            newVideo.save();
            return saveVideos(channel, array);
          });
          // console.log('the NEW VIDEO object ----->', newVideo);
        //callback
        });
      } else {
        return saveVideos(channel, array);
      } 
    })
  }
  return;
}

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(request, response) {

  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.post('/api', function(request, response) {
  // var channel = request.path.search.substring(9);
  var videolist = request.body.videos;
  var channelname = request.body.channel;

  // for(var i = 0; i < videolist.length; i++) {
  //   saveVideos(videolist[i], function(video){
  //     console.log("SAVED THIS: ", video);
  //   });
  // }
  response.end();
  saveVideos(channelname, videolist);

});

app.get('/feed',cache.route(), function(request, response) {
  var uploads = request.query.uploads;
  var channel = request.query.channel;
  console.log('channel & uploads', uploads, channel);
  response.contentType('text/xml')
  rss.generateRSS({channel, uploads}, (rssData) => {
    response.send(rssData);
  });
})

app.get('/api', function(request, response){
  var channel = request.query.channel;

  var thingToSend = {videos:[]};
  // get all the videos with this channel out of the DB:
  Video.find({channel: channel}, function(err, videos) {
    videos.forEach(function(video){
      var videoObj = {
        id: video.videoid,
        percent: video.percent,
        done: video.done,
        link: video.link
      };
      thingToSend.videos.push(videoObj);
    })
    response.write(JSON.stringify(thingToSend));
    response.end();
  });
  // response.send(201);

  // ytdl('http://www.youtube.com/watch?v=A02s8omM_hI', { filter: function(format) { return format.container === 'mp3'; } })
  // .pipe(fs.createWriteStream('video.mp3'));
})

app.get('/*', function(request, response) {
  // response.redirect('/?channel=' + request.path.slice(1));
  // response.redirect("http://www." + request.path.slice(1) + ".com");
  response.sendFile(path.resolve(__dirname, './public/index.html'));
})

module.exports = app;