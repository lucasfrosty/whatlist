import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { setAuth } from '../dataflow/actions';
import Login from './Login';
import Home from './Home';

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.bool.isRequired,
    setAuth: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('App rendered');
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={() => <Login auth={this.props.auth} setAuth={this.props.setAuth} />} />
          <Route path="/" component={() => <Home auth={this.props.auth} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  setAuth: (payload) => {
    dispatch(setAuth(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
