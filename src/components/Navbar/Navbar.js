import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

import NavbarBrand from './NavbarBrand';
import NavbarLoginModal from './NavbarLoginModal';
import NavbarUserInfo from './NavbarUserInfo';
import NavbarSearchInput from './NavbarSearchInput';

import { userLogin, userLogoff } from '../../dataflow/actions';
import firebase, { facebookProvider, googleProvider } from '../../utils/firebase';

const searchItemStyle = {
  marginLeft: 'auto',
  borderRight: '1px solid rgba(34,36,38,.1)',
  borderLeft: 'none',
  paddingTop: 5,
  paddingBottom: 5,
};

const Navbar = ({
  auth, user, onUserLogin, onUserLogoff,
}) => {
  const loginWithFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const {
          name, email, photoURL, displayName,
        } = result.user;

        onUserLogin({
          auth: true,
          user: {
            name,
            email,
            displayName,
            photoURL,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        onUserLogoff();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchData = (inputValue, type) => {
    // fetch the data
    console.log('value', inputValue);
    console.log('type', type);
  };

  return (
    <Menu fixed="top">
      <Container>
        <NavbarBrand />
        <Menu.Item style={searchItemStyle}>
          <NavbarSearchInput fetchData={fetchData} />
        </Menu.Item>
        <Menu.Item>
          {auth ? (
            <NavbarUserInfo user={user} logout={logout} />
          ) : (
            <NavbarLoginModal
              loginWithFacebook={loginWithFacebook}
              loginWithGoogle={loginWithGoogle}
            />
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

Navbar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  auth: PropTypes.bool.isRequired,
  onUserLogin: PropTypes.func.isRequired,
  onUserLogoff: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  onUserLogin: userLogin,
  onUserLogoff: userLogoff,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
