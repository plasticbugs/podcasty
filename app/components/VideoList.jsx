import React from 'react';
import VideoEntry from './VideoEntry.jsx';
import Header from './Header.jsx';

const VideoList = (props) => (
  <div className="video-list">
    <Header channel={props.channel} uploads={props.uploads} />
    {props.videos.map( function(video) {
      return (
        <VideoEntry
          video={video}
          key={video.snippet.resourceId.videoId}
          channel={props.channel}
        />
      );
    })}
  </div>
);

module.exports = VideoList;