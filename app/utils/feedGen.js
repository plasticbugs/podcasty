var RSS = require('rss');
var $ = require('jquery');

var generateRSS = function(channelName, uploads){
  var theData = {};

  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/channels',
    method: 'GET',
    data: {
      key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
      part: 'contentDetails',
      forUsername: channelName
    },
    success: function(data){
      data = data.items[0].snippet;
      theData.title = data.title;
      theData.description = data.description;
      theData.url = 'http://www.youtube.com/c/' + data.customUrl;
      theData.image = data.thumbnails.high.url;
      $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        method: 'GET',
        data: {
          key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
          part: 'snippet',
          maxResults: 10,
          playlistId: uploads
        },
        success: function(data){
          var resultsArray = [];
          for(var i = 0; i < data.items.length; i++) {
            data.items[i].percent = "0%"
            data.items[i].done = false;
            resultsArray.push(data.items[i]);
          }
          console.log(resultsArray);
          callback(resultsArray);
        }
      })
    }
    });

    var feed = new RSS(feedOptions);

}

exports.generateRSS = generateRSS;