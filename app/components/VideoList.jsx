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

    this.getChannel = this.getChannel.bind(this);
  }

  getChannel() {
    return this.props.match.params.channel;
  }
  

  componentDidMount() {
    let channel = this.getChannel()
    io({query:{token: channel}})
    .on('message', payload => {
      this.handleUpdatedProgress(payload)
      // console.log(payload)
      // socket.on('hello', msg => {
      //   console.log('server said: ', msg)
      // })
    })
    
    this.getLatestVideos(channel)
    .then(results => {
      this.setState(results, () => {
        console.log(this.state.videos)
      });
    });
  }

  handleUpdatedProgress(payload) {
    let updatedVideos = this.state.videos.map(video => {
      if (video.snippet.resourceId.videoId === payload.video) {
        return Object.assign({}, video, {percent: payload.percent})
      } else {
        return video;
      }
    })
    this.setState({videos: updatedVideos});
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