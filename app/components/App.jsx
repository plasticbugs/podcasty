import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import "semantic-ui-css/semantic.min.css"
import MainLayout from './MainLayout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/:channel' render={(props) => <MainLayout {...props} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));