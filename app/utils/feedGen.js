const RSS = require('rss');
const axios = require('axios');
const keys = require('../../config.js');

const buildRSS = (payload, responseData) => {
  let feed = new RSS({
    title: responseData.title,
    description: responseData.description,
    feed_url: "http://127.0.0.1:3000/feed?uploads=" + payload.uploads + "&channel=" + payload.channel,
    site_url: 'http://www.youtube.com/c/' + responseData.customUrl,
    image_url: responseData.thumbnails.high.url,
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      {'itunes:summary': responseData.description},
      {'itunes:image': {
        _attr: { href: responseData.thumbnails.medium.url }
      }}
    ]
  })
  feed.addItemToFeed = function(snippet) {
    this.item({
      title: snippet.title,
      description: snippet.description,
      date: snippet.publishedAt,
      enclosure: {url:'http://127.0.0.1:3000/bitbucket/' + snippet.resourceId.videoId + ".mp3"},
      custom_elements: [
        {'itunes:image': {
          _attr: {
            href: snippet.thumbnails.medium.url
          }
        }}
      ]
    })
  }
  return feed;
}

const generateRSS = (payload, callback) => {
  axios.get(
    'https://www.googleapis.com/youtube/v3/channels',
    {
      params: {
        key: keys.YT_API_KEY,
        part: 'snippet',
        forUsername: payload.channel
      }
    })
    .then(response => {
      let data = response.data.items[0].snippet;
      let feed = buildRSS(payload, data);

      axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          key: keys.YT_API_KEY,
          part: 'snippet',
          maxResults: 10,
          playlistId: payload.uploads
        }
      })
      .then( response => {
        response.data.items.forEach( video => {
          feed.addItemToFeed(video.snippet);
        })
        callback(feed.xml());
      })
    })
  }

exports.generateRSS = generateRSS;