import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { userLogin, userLogoff } from '../dataflow/actions';
import Login from './Login';
import Home from './Home';
// import ProtectedRoute from './ProtectedRoute';

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.bool.isRequired,
    onUserLogin: PropTypes.func.isRequired,
    onUserLogoff: PropTypes.func.isRequired,
  };

  componentDidMount() {
    console.log('App rendered');
  }

  render() {
    const { auth, onUserLogin, onUserLogoff } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            component={() => <Login auth={auth} onUserLogin={onUserLogin} />}
          />
          <Route path="/" component={() => <Home auth={auth} onUserLogoff={onUserLogoff} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  onUserLogin: userLogin,
  onUserLogoff: userLogoff,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
