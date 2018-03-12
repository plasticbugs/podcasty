import React from 'react';
import axios from 'axios';
// import io from 'socket.io';
// import keys from '../../config';
import io from 'socket.io-client';

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
  

  getLatestVideos(channelID) {
    return new Promise( (resolve, reject) => {
      axios.get('/api', {
        params: {
          channel: channelID
        }
      })
      .then(results => {
        resolve({videos: results.data.videos, uploads: results.data.uploads})
      })
      .catch(err => {
        reject(err);
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
    io('http://localhost:3001', {
      path: `/${channel}`
    })
    .on('connection', socket => {
      socket.on('hello', msg => {
        console.log('server said: ', msg)
      })
    })
    this.getLatestVideos(channel)
    .then(results => {
      this.setState(results, () => {
        console.log(this.state.videos)
      });
    });
  }
  
  render() {
    let channel = this.getChannel();
    return (
      <div className="video-list">
        <Header channel={channel} uploads={this.state.uploads} />
        {this.state.videos.map( function(video) {
          return (
            <VideoEntry
              video={video}
              key={video.snippet.resourceId.videoId}
              channel={channel}
            />
          );
        })}
      </div>
    )
  }
}

module.exports = VideoList;