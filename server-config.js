var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var db = require('./app/config.js');
var Video = require('./app/models/videos.js');
var Channel = require('./app/models/channels.js');
var async = require('async');
var _ = require('underscore');
// PULLY
import { Pully, Presets } from 'pully';
 
var pully = new Pully();
 
var pullyOptions = {
  dir: './bitbucket',
  preset: Presets.MP3,
  progress: (data) => console.log(data.percent + '%'),
  path: path.resolve(__dirname, './') // Progress reporter callback...
};
// END PULLY

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(request, response){
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.post('/api', function(request, response){
  // var channel = request.path.search.substring(9);
  var videolist = request.body.videos;
  var channelname = request.body.channel;
  async.each(videolist, function(video){
    var id = video.contentDetails.videoId;
    Video.findOne({videoid: id}, function(err, video){
      if(video === null){
        console.log("inside LOOP: ", id);
        var newVideo = new Video({percent: "0", videoid: id, done: false});
        newVideo.save(function(err) {
          console.log('the NEW VIDEO object ----->', newVideo);
          // res.status(200).send(newLink);
          pullyOptions.url = 'http://www.youtube.com/watch?v=' + id;
          _.debounce(function(){
            pully.download(pullyOptions).then((
              path => console.log('Downloaded to ' + path), // Path to the downloaded file
              err => console.error(err) // Error info
            ))
            .then(console.log('DONE!!!'));
          }, 500);
        });
      }
    })
  })

  response.end();
});

app.get('/api', function(request, response){
  
  response.send(201);

  // response.send('{mrpoopy: "butthole"}')
  // ytdl('http://www.youtube.com/watch?v=A02s8omM_hI', { filter: function(format) { return format.container === 'mp3'; } })
  // .pipe(fs.createWriteStream('video.mp3'));
})

app.get('/*', function(request, response){
  // response.redirect('/?channel=' + request.path.slice(1));
  // response.redirect("http://www." + request.path.slice(1) + ".com");
  response.sendFile(path.resolve(__dirname, './public/index.html'));
})

module.exports = app;