import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ auth, onUserLogoff }) => (
  <Fragment>
    <h1>To watch list;</h1>
    {auth ? <button onClick={onUserLogoff}>Logoff</button> : <Link to="/login">Sign In</Link>}
  </Fragment>
);

Home.propTypes = {
  auth: PropTypes.bool.isRequired,
  onUserLogoff: PropTypes.func.isRequired,
};

export default Home;
