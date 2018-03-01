const React = require('react');
const Header = (props) => (
  <div className="title">
    {console.log("header", props)}
    <h1 className="channel-title ">{props.channel}</h1>
    <a 
      className="feed" 
      href={"/feed?uploads=" + props.uploads + "&channel=" + props.channel}>
        <i className="fa fa-podcast"></i>get feed
    </a>
  </div>
);

module.exports = Header;