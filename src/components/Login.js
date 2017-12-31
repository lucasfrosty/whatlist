import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import firebase, { facebookProvider } from '../utils/firebase';

class Login extends React.Component {
  static propTypes = {
    onUserLogin: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
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
    const getComponent = (auth) => {
      if (auth) return <Redirect to="/" />;

      return (
        <div>
          <button onClick={this.loginWithFacebook}>Login with Facebook</button>
          <button>Login with Github</button>
        </div>
      );
    };

    return getComponent(this.props.auth);
  }
}

export default Login;
