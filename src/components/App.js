import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import ProtectedRoute from './ProtectedRoute';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Details from './Details/Details';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/details/:type/:id" component={Details} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
