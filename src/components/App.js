import React from 'react';
import { Redirect } from 'react-router-dom';

class App extends React.Component {
  state = {
    isLogged: false,
  }

  render() {
    return this.state.isLogged ? <h1>:)</h1> : <Redirect to="/login" />;
  }
}

export default App;
