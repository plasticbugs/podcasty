var React = require('react');
var ReactDOM = require('react-dom');
const axios = require('axios');
var ytHelper = require('../utils/youtubeHelper.js')

var Header = require('./Header.jsx');
var VideoList = require('./VideoList.jsx');

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
    var obj = {}
    obj.videos = this.props.theList;
    obj.channel = this.props.channel;
    axios.post('/api?channel=' + obj.channel, obj)
    .then(success => {
      console.log("Successful POST")
    })
    .catch(err => {
      console.log("Error posting data: ", err)
    })

//    Every 10 seconds, poll the server and check to see the upload switch
    setInterval(function(){
      axios.get('/api?channel=' + this.props.channel)
      .then(results => {
        let data = results.data;
        for(var i = 0; i < this.state.videoList.length; i++){
          for (var j = 0; j < data.videos.length; j++) {
            if(this.state.videoList[i].snippet.resourceId.videoId === data.videos[j].id) {
              let listCopy = this.state.videoList.slice();
              listCopy[i].percent = data.videos[j].percent;
              listCopy[i].done = data.videos[j].done;
              this.setState({videoList: listCopy});
            }
          }
        }
      })
    }.bind(this), 200);
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
