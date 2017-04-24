var RSS = require('rss');
var najax = require('najax');

var generateRSS = function(channelName, uploads){
  var theData = {};
  var feed;
  najax({
    url: 'https://www.googleapis.com/youtube/v3/channels',
    method: 'GET',
    data: {
      key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
      part: 'snippet',
      forUsername: channelName
    },
    success: function(data){
      console.log(data);
      data = JSON.parse(data);
      data = data.items[0].snippet;
      theData.title = data.title;
      theData.description = data.description;
      theData.url = 'http://www.youtube.com/c/' + data.customUrl;
      theData.image = data.thumbnails.high.url;
      najax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        method: 'GET',
        data: {
          key: 'AIzaSyDWPzFJNjsUEfmz5NKoGNP3PHWGrRXxpRk',
          part: 'snippet',
          maxResults: 10,
          playlistId: uploads
        },
        success: function(data){
          data = JSON.parse(data);
          var resultsArray = [];
          for(var i = 0; i < data.items.length; i++) {
            resultsArray.push(data.items[i]);
          }
          theData.videos = resultsArray;
          feed = new RSS({
            title: theData.title,
            description: theData.description,
            feed_url: "http://127.0.0.1:3000/feed?uploads=" + uploads + "&channel=" + channelName,
            site_url: theData.url,
            image_url: theData.image,
            custom_namespaces: {
              'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
            },
            custom_elements: [
              {'itunes:summary': theData.description},
              {'itunes:image': {
                _attr: { href: theData.image }
              }}
            ]
          });
          theData.videos.forEach(function(video){
            var snippet = video.snippet;
            feed.item({
              title: snippet.title,
              description: snippet.description,
              enclosure: {url:'http://127.0.0.1:3000/', file: 'bitbucket/' + snippet.resourceId.videoId + "__.mp3"},
              custom_elements: [
                {'itunes:image': {
                  _attr: {
                    href: snippet.thumbnails.medium.url
                  }
                }}
              ]
            })
          })
          return feed.xml();
        }
      })
    }
  });
}

exports.generateRSS = generateRSS;