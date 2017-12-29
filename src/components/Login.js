import React from 'react';

class Login extends React.Component {
  componentDidMount() {
    console.log('xD');
  }

  render() {
    return (
      <div>
        <button>Login with Facebook</button>
        <button>Login with Github</button>
      </div>
    );
  }

}

export default Login;
