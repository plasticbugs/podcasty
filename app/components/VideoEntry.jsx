import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

import Percent from './Percent.jsx';
import DownloadButton from './DownloadButton.jsx';

export default class VideoEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ytLink = `http://youtube.com/watch?v=${this.props.video.snippet.resourceId.videoId}`
    return (
      <Item>
        {/* <Item.Image size='small' src={props.video.snippet.thumbnails.default.url} /> */}
        <Item.Image size='small' src={`https://img.youtube.com/vi/${this.props.video.snippet.resourceId.videoId}/mqdefault.jpg`} />
  
        <Item.Content>
          <Item.Header as='a' href={ytLink}>{this.props.video.snippet.title}</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            {this.props.video.snippet.description.slice(0,200).concat('...')}
          </Item.Description>
          <Item.Extra>
          <Percent video={this.props.video} />
            Published at: {this.props.video.snippet.publishedAt}
          </Item.Extra>
        </Item.Content>
      </Item>
      // <div className="vid-entry">
      //   {downloadOrPercent()}
      //   <div className="video-title">
      //     {props.video.snippet.title}
      //   </div>
      //   <div className="thumb-container">
      //     <img src={props.video.snippet.thumbnails.default.url} width="60" height="45"/>
      //   </div>
      // </div>
    );
  }
}

// module.exports = VideoEntry;