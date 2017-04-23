var React = require('react');
var VideoEntry = require('./VideoEntry.jsx');

var VideoList = (props) => (
  <div className="video-list">
    {props.videos.map(function(video){
      return <VideoEntry video={video} key={video.snippet.resourceId.videoId} channel={props.channel}/>
    })}
  </div>
);

module.exports = VideoList;