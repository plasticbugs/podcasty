var $ = require('jquery');
var keys = require('../../config.js')

//https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk&part=snippet&maxResults=50&playlistId=UUR_eeue4E0jNBz8A55DOuOg

var lookUpVideos = function (channelID, callback){
  var uploads;
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/channels',
    method: 'GET',
    data: {
      key: keys.YT_API_KEY,
      part: 'contentDetails',
      forUsername: channelID
    },
    success: function(data){
      uploads = data.items[0].contentDetails.relatedPlaylists.uploads;
      $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        method: 'GET',
        data: {
          key: keys.YT_API_KEY,
          part: 'snippet',
          maxResults: 10,
          playlistId: data.items[0].contentDetails.relatedPlaylists.uploads
        },
        success: function(data){
          var resultsArray = [];
          for(var i = 0; i < data.items.length; i++) {
            data.items[i].percent = "0%"
            data.items[i].done = false;
            resultsArray.push(data.items[i]);
          }
          callback(resultsArray, uploads);
        }
      })
    }
  })
}

exports.lookUp = lookUpVideos;