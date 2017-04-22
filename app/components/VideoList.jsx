var React = require('react');
var VideoEntry = require('./VideoEntry.jsx');

var VideoList = (props) => (
  <ul className="list">
    {props.channels.map(function(channel){
      return <VideoEntry video={channel} />
    })}
  </ul>
);

module.exports = VideoList;