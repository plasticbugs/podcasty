var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var $ = require('jquery');
var ytHelper = require('../utils/youtubeHelper.js')

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
      channel: this.props.channel,
      uploads: null
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
    url: '/api?channel=' + obj.channel,
    data: JSON.stringify(obj),
    success: function(data){
        console.log("Successful POST");
      }
    });

//    Every 10 seconds, poll the server and check to see the upload switch
    var that = this;
    setInterval(function(){
      $.ajax({
        url: '/api?channel=' + this.props.channel,
        method: 'GET',
        contentType: 'application/json',
        success: function(data){
          data = JSON.parse(data);
          for(var i = 0; i < that.state.videoList.length; i++){
            for (var j = 0; j < data.videos.length; j++) {
              if(that.state.videoList[i].snippet.resourceId.videoId === data.videos[j].id) {
                that.state.videoList[i].percent = data.videos[j].percent;
                that.state.videoList[i].done = data.videos[j].done;
                that.setState({videoList: that.state.videoList});
              }
            }
          }
          data.videos.forEach(function(video) {
            
          });
          // videos.forEach(function(video) {
          //   console.log(data);
          // });
        }
      });
    }.bind(this), 200);
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
        <Header channel={this.props.channel} uploads={this.props.uploads} />
        <VideoList videos={this.props.theList} channel={this.props.channel} />
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


ytHelper.lookUp(window.location.pathname.substring(1), function(data, uploads){

  ReactDOM.render(<App channel={window.location.pathname.substring(1)} theList={data} uploads={uploads}/>, document.getElementById('app'));
});
