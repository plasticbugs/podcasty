var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var $ = require('jquery');
var lookUpVideos = require('../utils/youtubeHelper.js')

var Header = require('./Header.jsx');
var VideoList = require('./VideoList.jsx');

// var App = createReactClass({
//   render: function() {
//     return (
//       <div></div>
//     )
//   }
// });

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoList: this.props.theList,
      channel: this.props.channel
    }
  }

  componentDidMount() {
    console.log(this.props.theList);
    var obj = {}
    obj.videos = this.props.theList;
    obj.channel = this.props.channel;
    $.ajax({
    type: "POST",
    contentType:'application/json',
    url: '/api?channel=' + this.props.channel,
    data: JSON.stringify(obj),
    success: function(data){
        console.log("Successful POST");
      }
    });

    // setInterval(function(){
    //   var result = []
    //   for(var i = 0; i < this.props.theList.length; i++) {
    //     this.props.theList[i].contentDetails.videoId += ":D";
    //     result.push(this.props.theList[i]);
    //   }
    //   // $.get('/api?channel=' + this.props.channel, function(data){
    //   //   console.log(this.props.channel);
    //   // }.bind(this));
    //   this.setState({videoList: result});
    // }.bind(this), 3000);
  }

  render() {
    return (
      <div>
        <Header channel={this.props.channel}/>
        <VideoList channels={this.props.theList} />
      </div>
    )
  }

        // {this.props.theList.map(function(element){
        //   return <li>element.contentDetails.videoId</li>
        // })}
  /*render() {
    return (
      <div>{lookUpVideos(this.props.channel, function(data){
        this.setState({videoList: data})}.bind(this))}
      </div>
    )
  }*/
}


lookUpVideos(window.location.pathname.substring(1), function(data){
  ReactDOM.render(<App channel={window.location.pathname.substring(1)} theList={data}/>, document.getElementById('app'));
});
