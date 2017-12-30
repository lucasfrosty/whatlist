import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import firebase, { facebookProvider } from '../utils/firebase';

class Login extends React.Component {
  static propTypes = {
    setAuth: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
  }

  loginWithFacebook = () => {
    firebase.auth().signInWithPopup(facebookProvider).then((res) => {
      const { user, credential } = res;

      console.log('Token > ', credential.accessToken);
      console.log('User > ', user);

      this.props.setAuth({
        user: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        auth: true,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const componentToRender = (isAuth) => {
      if (isAuth) return <Redirect to="/" />;

      return (
        <div>
          <button onClick={this.loginWithFacebook}>Login with Facebook</button>
          <button>Login with Github</button>
        </div>
      );
    };

    return componentToRender(this.props.auth);
  }
}

export default Login;
