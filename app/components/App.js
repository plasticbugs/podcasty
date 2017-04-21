var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var Router = require('react-router');

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

  }

  render() {
    return (
      <div>{this.props.channel}</div>
    );
  }
}

ReactDOM.render(<App channel={window.location.pathname.substring(1)}/>, document.getElementById('app'));
