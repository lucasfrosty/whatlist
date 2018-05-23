import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

/* this Component check if the user is authenticated
 * if is not, will automatically redirect to the Home Page
 * TODO: redirect to the last page that the user was (instead of the Home Page) */
function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        user === null
          ? <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          : <Component {...props} />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
