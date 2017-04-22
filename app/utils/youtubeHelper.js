var $ = require('jquery');

var lookUpVideos = function (channelID, callback){
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/channels',
    method: 'GET',
    data: {
      key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
      part: 'contentDetails',
      forUsername: channelID
    },
    success: function(data){
      $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        method: 'GET',
        data: {
          key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
          part: 'contentDetails',
          maxResults: 10,
          playlistId: data.items[0].contentDetails.relatedPlaylists.uploads
        },
        success: function(data){
          var resultsArray = [];
          for(var i = 0; i < data.items.length; i++) {
            resultsArray.push(data.items[i]);
          }
          console.log(resultsArray);
          callback(resultsArray);
        }
      })
    }
  })
}

module.exports = lookUpVideos;