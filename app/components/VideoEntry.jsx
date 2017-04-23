var React = require('react');

var VideoEntry = (props) => (
  <div>{props.video.snippet.title} -- {props.video.percentage}</div>
);

module.exports = VideoEntry;