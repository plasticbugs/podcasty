var React = require('react');

var VideoEntry = (props) => (
  <div>{props.video.snippet.title}</div>
);

module.exports = VideoEntry;