import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Navbar from './Navbar/Navbar';
import ProtectedRoute from './ProtectedRoute';
import Loading from './LoadingSpinner';


const Home = Loadable({
  loader: () => import('./Home/Home'),
  loading: Loading,
});

const Details = Loadable({
  loader: () => import('./Details/Details'),
  loading: Loading,
});

const Whatlist = Loadable({
  loader: () => import('./Whatlist/Whatlist'),
  loading: Loading,
});


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
