import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Navbar from './Navbar';

const Teste = () => <h1>Teste</h1>;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute path="/teste" component={Teste} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
