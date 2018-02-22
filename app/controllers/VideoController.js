const { Pully, Presets } = require('pully')
const path = require('path');
let pully = new Pully();
const Video = require('../models/videos.js');

module.exports.saveVideos = (req, res) => {
  let videolist = req.body.videos;
  let channel = req.body.channel;
  res.send(200);

  const recurse = (array) => {
    if (array.length) {
      let item = array.shift();
      let id = item.snippet.resourceId.videoId;
      Video.findOne({videoid: id}, (err, savedVideo) => {
        if (!savedVideo) {
          let newVideo = new Video({percent: "0%", videoid: id, done: false, channel});
          newVideo.save( err => {
            if (err) {
              throw err;
            }
            let pullyOptions = {
              dir: './public/bitbucket',
              template: '${id}',
              preset: Presets.MP3,
              progress: function(data) { // Progress reporter callback...
                newVideo.percent = data.percent + '%';
                newVideo.save();
                console.log(data.percent + '%')
              },
              path: path.resolve(__dirname, './') 
            };
            pullyOptions.url = 'http://www.youtube.com/watch?v=' + id;
            pully.download(pullyOptions).then(
              place => {
                console.log('Downloaded to ' + place.path);
               },
               err => {
                 throw err;
               }
            )
            .then( () => {
              newVideo.done = true;
              newVideo.save();
              recurse(array)
            });
          });
        } else if (savedVideo.percent !== '100%') {
          console.log("hey, not done yet", savedVideo)
          Video.remove({_id: savedVideo._id}, err => {
            if (err) {
              throw err;
            } else {
              array.unshift(item);
              recurse(array);
            }
          })
          // savedVideo.remove();
          // console.log(savedVideo.d)
        } else {
          console.log("this one I got", savedVideo)
          array.shift();
          recurse(array)
        } 
      })
    }
  }
  recurse(videolist)
}

module.exports.retrieveVideos = (req, res) => {
  var channel = req.query.channel;
  var responseObject = {videos:[]};
  // get all the videos with this channel out of the DB:
  Video.find({channel}, (err, videos) => {
    videos.forEach( video => {
      let videoObj = {
        id: video.videoid,
        percent: video.percent,
        done: video.done,
        link: video.link
      };
      responseObject.videos.push(videoObj);
    })
    res.json(responseObject);
  })
}