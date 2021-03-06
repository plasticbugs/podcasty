import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Container, Item } from 'semantic-ui-react';

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
    })
    
    this.getLatestVideos(channel)
    .then(results => {
      console.log('initial fetch from server', results)
      this.setState(results, () => {
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
    console.log(this.state.uploads)
    return (
      <div>
        <Container style={{ marginTop: '7em' }}>
          <Header channel={channel} uploads={this.state.uploads} />
          <Item.Group divided>
            {this.state.videos.map( function(video) {
              return (
                <VideoEntry
                  video={video}
                  key={video.snippet.resourceId.videoId}
                  channel={channel}
                />
              );
            })}
          </Item.Group>
        </Container>
      </div>
    )
  }
}

module.exports = VideoList;