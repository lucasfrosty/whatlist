// NOT USING THIS FOR NOW
// JUST KEEPING FOR REMIND PURPOSES

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import firebase, { facebookProvider } from '../utils/firebase';

class Login extends React.Component {
  static propTypes = {
    onUserLogin: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  loginWithFacebook = () => {
    firebase.auth().signInWithPopup(facebookProvider).then((res) => {
      const { user, credential } = res;
      const { name, email, photoURL } = user;

      this.props.onUserLogin({
        auth: true,
        user: {
          name,
          email,
          photoURL,
          token: credential.accessToken,
        },
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    console.log('XDD', this.props.location);
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
      this.props.auth
        ? <Redirect to={from} />
        : (
          <div>
            <p>Login into {from.pathname}</p>
            <button onClick={this.loginWithFacebook}>Login with Facebook</button>
            <button>Login with Github</button>
          </div>
        )
    );
  }
}

export default withRouter(Login);
