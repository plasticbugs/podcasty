var React = require('react');
var Header = (props) => (
  <div className="title"><h1>{props.channel}</h1><a className="feed" href={"/feed?uploads=" + props.uploads + "&channel=" + props.channel}>get feed</a></div>
);

module.exports = Header;