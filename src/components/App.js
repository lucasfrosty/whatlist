import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from './Home';

const Teste = () => <h1>Teste</h1>;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/teste" component={Teste} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
