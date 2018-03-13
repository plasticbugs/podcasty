const path = require('path');
import Video from '../models/videos.js';
const keys = require('../../config');
const axios = require('axios');
const Q = require('bee-queue');
const qHelper = require('../utils/worker');
// const socketController = require('../controllers/SocketController');

const getVideosAndUploadsID = (channelID) => {
  return new Promise( (resolve, reject) => {
    axios.get('https://www.googleapis.com/youtube/v3/channels',
    {params: {
      key: keys.YT_API_KEY,
      part: 'contentDetails',
      forUsername: channelID 
      }
    })
    .then(results => {
      let uploads = results.data.items[0].contentDetails.relatedPlaylists.uploads;
      axios.get('https://www.googleapis.com/youtube/v3/playlistItems',
      {
        params: {
          key: keys.YT_API_KEY,
          part: 'snippet',
          maxResults: 10,
          playlistId: uploads
        }
      })
      .then(results => {
        findOrCreateVideos(results.data.items)
        .then(videos => {
          resolve({videos, uploads})
        })
      })
    })
  })
}

const findOrCreateVideos = (videoList) => {
  const downloadQueue = new Q(`download ${videoList[0].snippet.channelTitle} ${Math.floor(Math.random() * 100000000)}}`);
  return new Promise( (resolve, reject) => {
    let updatedList = [];
    let videosToDownload = [];
    (function recurse(array) {
      if (array.length) {
        let item = array.shift();
        let videoid = item.snippet.resourceId.videoId;
        let channel = item.snippet.channelTitle;
        Video.findOne({videoid}, (err, savedVideo) => {
          if (!savedVideo) {
            let newVideo = new Video({videoid, done: false, channel});
            newVideo.save( err => {
              if (err) {
                reject(err);
              }
              // console.log(newVideo)
              videosToDownload.push(newVideo)
              item.done = false;
              updatedList.push(item);
              recurse(array);
            })
          } else {
            item.done = savedVideo.done;
            updatedList.push(item);
            recurse(array);
          }
        })
      } else {
        if (videosToDownload.length) {
          qHelper.queueDownloads(videosToDownload, downloadQueue);
        }
        resolve(updatedList)
      }
    })(videoList)
  })
}

// module.exports.joinRoom = (socket) => {
//   socket.
// }
 
// module.exports.saveVideos = (req, res) => {
//   let videolist = req.body.videos;
//   let channel = req.body.channel;
//   res.send(200);

//   (function recurse(array) {
//     if (array.length) {
//       let item = array.shift();
//       let id = item.snippet.resourceId.videoId;

      
//             let pullyOptions = {
//               dir: './public/bitbucket',
//               template: '${id}',
//               preset: Presets.MP3,
//               progress: function(data) { // Progress reporter callback...
//                 newVideo.percent = data.percent + '%';
//                 newVideo.save();
//                 console.log(data.percent + '%')
//               },
//               path: path.resolve(__dirname, './') 
//             };
//             pullyOptions.url = 'http://www.youtube.com/watch?v=' + id;
//             pully.download(pullyOptions).then(
//               place => {
//                 console.log('Downloaded to ' + place.path);
//                },
//                err => {
//                  throw err;
//                }
//             )
//             .then( () => {
//               newVideo.done = true;
//               newVideo.save();
//               recurse(array)
//             });
//           });
//         } else if (savedVideo.percent !== '100%') {
//           Video.remove({_id: savedVideo._id}, err => {
//             if (err) {
//               throw err;
//             } else {
//               array.unshift(item);
//               recurse(array);
//             }
//           })
//         } else {
//           recurse(array)
//         } 
//       })
//     }
//   })(videolist)
// }

module.exports.retrieveVideos = (req, res) => {
  var channel = req.query.channel;
  getVideosAndUploadsID(channel)
  .then(results => {
    res.send(results)
  })
  // var responseObject = {videos:[]};
  // let  = [];
  // // get all the videos with this channel out of the DB:
  // Video.find({channel}, (err, videos) => {
  //   videos.forEach( video => {
  //     let videoObj = {
  //       id: video.videoid,
  //       percent: video.percent,
  //       done: video.done,
  //       link: video.link
  //     };
  //     responseObject.videos.push(videoObj);
  //   })
  //   res.json(responseObject);
  // })
}
