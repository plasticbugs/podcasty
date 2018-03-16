const React = require('react');
import { Header } from 'semantic-ui-react';

const ChannelHeader = (props) => (
  <Header as='h1'>{props.channel}</Header>
  // <div className="title">
  //   <h1 className="channel-title ">{props.channel}</h1>
  //   <a 
  //     className="feed" 
  //     href={"/feed?uploads=" + props.uploads + "&channel=" + props.channel}>
  //       <i className="fa fa-podcast"></i>get feed
  //   </a>
  // </div>
);

export default ChannelHeader;