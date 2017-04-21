var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

var App = createReactClass({
  render: function() {
    return (
      <div>Hello World</div>
    )
  }
});



ReactDOM.render(<App />, document.getElementById('app'));