import axios from 'axios';
const keys = require('../../config.js')

const getChannelVideos = function (channelID, callback) {
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
      let videoArray = [];
      for(let i = 0; i < results.data.items.length; i++) {
        let video = JSON.parse(JSON.stringify(results.data.items[i]))
        video.percent = "0%"
        video.done = false;
        videoArray.push(video);
      }
      callback(videoArray, uploads);
    })
  })
}


export {
  getChannelVideos,
}