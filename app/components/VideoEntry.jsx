var React = require('react');

var VideoEntry = (props) => (
  <div>{props.video.snippet.title} -- {props.video.percent}</div>
);

module.exports = VideoEntry;