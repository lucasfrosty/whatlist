import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Image, Menu, Button, Icon, Dropdown } from 'semantic-ui-react';

import { userLogin, userLogoff } from '../dataflow/actions';
import Popcorn from '../assets/popcorn.svg';
import firebase, { facebookProvider } from '../utils/firebase';

const leftMenuItemStyle = { marginLeft: 'auto', borderLeft: '1px solid rgba(34,36,38,.1)' };
const borderLeft = { borderLeft: '1px solid rgba(34,36,38,.1)' };

const Navbar = ({
  auth, user, onUserLogin, onUserLogoff,
}) => {
  const loginWithFacebook = () => {
    firebase.auth().signInWithPopup(facebookProvider).then((result) => {
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
    }).catch((err) => {
      console.log(err);
    });
  };

  const logoutWithFacebook = () => {
    firebase.auth().signOut().then(() => {
      onUserLogoff();
    }).catch((err) => {
      console.error(err);
    });
  };

  const menuItemsToRender = (isAuth) => {
    if (!isAuth) {
      return (
        <Menu.Item style={leftMenuItemStyle}>
          <Button color="facebook" onClick={loginWithFacebook}>
            <Icon name="facebook" /> Login with Facebook
          </Button>
        </Menu.Item>
      );
    }

    const trigger = (
      <span>
        <Image src={user.photoURL} avatar />
      </span>
    );

    const options = [
      {
        key: 'user-info',
        text: <span>Signed in as <strong>{user.displayName}</strong></span>,
        disabled: true,
      },
      { key: 'user', text: 'Account', icon: 'user' },
      { key: 'settings', text: 'Settings', icon: 'settings' },
      {
        key: 'sign-out',
        text: (
          <span>
            <Dropdown.Divider />
            <Button fluid onClick={logoutWithFacebook}>Logout</Button>
          </span>
        ),
        onClick: () => logoutWithFacebook(),
      },
    ];

    return (
      <Menu.Menu position="right">
        <Menu.Item>
          <Dropdown trigger={trigger} options={options} pointing="top left" icon={null} />
        </Menu.Item>
      </Menu.Menu>
    );
  };

  return (
    <Menu fixed="top">
      <Container>
        <Link to="/">
          <Menu.Item as="a" style={borderLeft} header>
            <Image size="mini" src={Popcorn} width="22" style={{ marginRight: '.3em' }} />
            watchlist
          </Menu.Item>
        </Link>
        {menuItemsToRender(auth)}
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
