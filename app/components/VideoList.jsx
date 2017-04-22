var React = require('react');
var VideoEntry = require('./VideoEntry.jsx');

var VideoList = (props) => (
  <ul className="list">
    {props.channels.map(function(channel){
      return <VideoEntry video={channel} key={channel.contentDetails.videoId} />
    })}
  </ul>
);

module.exports = VideoList;