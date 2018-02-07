import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest, user }) => (
  <Route
    {...rest}
    render={props => (
      user !== null ? <Component {...props} /> : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
