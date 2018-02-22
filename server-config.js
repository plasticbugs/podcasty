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
 
// var pullyOptions = {
//   dir: './bitbucket',
//   preset: Presets.MP3,
//   progress: (data) => console.log(data.percent + '%'),
//   path: path.resolve(__dirname, './') // Progress reporter callback...
// };
// END PULLY

// var saveVideos = function(channel, array) {
//   if(array.length > 0) {
//     var id = array[0].snippet.resourceId.videoId;
//     array.shift();
//     Video.findOne({videoid: id}, function(err, video){
//       console.log("looking for ", id, " and got ", video)
//       if (video && video.percent !== '100%') {
//         video.remove();
//         video = null;
//       }
//       if (video === null) {
//         var newVideo = new Video({percent: "0%", videoid: id, done: false, channel: channel});
//         newVideo.save(function(err) {

//           var pullyOptions = {
//             dir: './public/bitbucket',
//             template: '${id}',
//             preset: Presets.MP3,
//             progress: function(data){
//               newVideo.percent = data.percent + '%';
//               newVideo.save();
//               console.log(data.percent + '%')
//             }, 
//             path: path.resolve(__dirname, './') // Progress reporter callback...
//           };
//           console.log("inside LOOP: ", id);
//           pullyOptions.url = 'http://www.youtube.com/watch?v=' + id;
//           pully.download(pullyOptions).then(
//             place => console.log('Downloaded to ' + place.path), // Path to the downloaded file
//             err => console.error(err) // Error info
//           )
//           .then(function(){
//             newVideo.done = true;
//             newVideo.save();
//             return saveVideos(channel, array);
//           });
//           // console.log('the NEW VIDEO object ----->', newVideo);
//         //callback
//         });
//       } else {
//         return saveVideos(channel, array);
//       } 
//     })
//   }
//   return;
// }

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(request, response) {

  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.post('/api', VideoController.saveVideos);
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
  // response.redirect('/?channel=' + request.path.slice(1));
  // response.redirect("http://www." + request.path.slice(1) + ".com");
  response.sendFile(path.resolve(__dirname, './public/index.html'));
})

module.exports = app;