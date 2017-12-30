import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ auth }) => (
  <Fragment>
    <h1>xD</h1>
    {auth || <Link to="/login">Sign In</Link>}
  </Fragment>
);

Home.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default Home;
