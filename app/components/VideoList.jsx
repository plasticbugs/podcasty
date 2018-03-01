import React from 'react';
import axios from 'axios';

import keys from '../../config';
import VideoEntry from './VideoEntry.jsx';
import Header from './Header.jsx';

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      uploads: null,
      polling: false,
    }
    this.pollServerForUpdates = this.pollServerForUpdates.bind(this);
    this.startPolling = this.startPolling.bind(this);
    this.getChannel = this.getChannel.bind(this);
  }

  getChannel() {
    return this.props.match.params.channel;
  }
  

  getLatestVideos(channelID, callback) {
    console.log(channelID, keys)
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

  pollServerForUpdates(channel) {
    axios.get('/api?channel=' + channel)
    .then(results => {
      let data = results.data;
      for(let i = 0; i < this.state.videos.length; i++){
        for (let j = 0; j < data.videos.length; j++) {
          if(this.state.videos[i].snippet.resourceId.videoId === data.videos[j].id) {
            let listCopy = this.state.videos.slice();
            listCopy[i].percent = data.videos[j].percent;
            listCopy[i].done = data.videos[j].done;
            this.setState({videos: listCopy});
          }
        }
      }
    })
  }

  startPolling(videos, channel) {
    let payload = {
      videos,
      channel
    };
    axios.post('/api?channel=' + channel, payload)
    .then(success => {
      console.log("Successful POST")
    })
    .catch(err => {
      console.log("Error posting data: ", err)
    })
    if (!this.state.polling) {
      this.setState({polling: true}, () => {
        this.pollServerForUpdates(channel);
        setInterval( () => {
          this.pollServerForUpdates(channel)
        }, 5000)
      })
    }
  }

  componentDidMount() {
    let channel = this.getChannel()
    this.getLatestVideos(channel, (videos, uploads) => {
      this.setState({videos, uploads}, () => {
        console.log(this.state)
        this.startPolling(videos, channel)
      });
    })
  }
  
  render() {
    let channel = this.getChannel();
    return (
      <div className="video-list">
        <Header channel uploads={this.props.uploads} />
        {this.state.videos.map( function(video) {
          return (
            <VideoEntry
              video={video}
              key={video.snippet.resourceId.videoId}
              channel
            />
          );
        })}
      </div>
    )
  }
}

module.exports = VideoList;