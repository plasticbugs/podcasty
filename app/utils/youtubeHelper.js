const axios = require('axios');
var keys = require('../../config.js')

var lookUpVideos = function (channelID, callback) {
  var uploads;
  axios.get('https://www.googleapis.com/youtube/v3/channels',
  {params: {
    key: keys.YT_API_KEY,
    part: 'contentDetails',
    forUsername: channelID 
    }
  })
  .then(results => {
    uploads = results.data.items[0].contentDetails.relatedPlaylists.uploads;
    axios.get('https://www.googleapis.com/youtube/v3/playlistItems',
    {
      params: {
        key: keys.YT_API_KEY,
        part: 'snippet',
        maxResults: 10,
        playlistId: results.data.items[0].contentDetails.relatedPlaylists.uploads
      }
    })
    .then(results => {
      let resultsArray = [];
      for(let i = 0; i < results.data.items.length; i++) {
        results.data.items[i].percent = "0%"
        results.data.items[i].done = false;
        resultsArray.push(results.data.items[i]);
      }
      callback(resultsArray, uploads);
    })
  })
}
exports.lookUp = lookUpVideos;