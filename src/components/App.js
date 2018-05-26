import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import Details from './Details/Details';
import ProtectedRoute from './ProtectedRoute';
import Whatlist from './Whatlist/Whatlist';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/details/:type/:id" component={Details} />
          <ProtectedRoute exact path="/whatlist" component={Whatlist} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
