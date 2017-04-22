var React = require('react');

var VideoEntry = (props) => (
  <li>{props.video.contentDetails.videoId}</li>
);

module.exports = VideoEntry;