import React from 'react';
import VideoEntry from './VideoEntry.jsx';

const VideoList = (props) => (
  <div className="video-list">
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