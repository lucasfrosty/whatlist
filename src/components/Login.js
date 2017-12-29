import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  componentDidMount() {
    console.log('Login');
  }

  render() {
    return (
      !this.props.auth ? (
        <div>
          <button onClick={() => this.props.setAuth(true)}>Login with Facebook</button>
          <button>Login with Github</button>
        </div>
      ) : (
        <Redirect to="/" />
      )
    );
  }
}

export default Login;
