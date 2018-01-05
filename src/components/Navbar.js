import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Container,
  Image,
  Menu,
  Button,
  Dropdown,
  Modal,
  Form,
  Divider,
} from 'semantic-ui-react';

import { userLogin, userLogoff } from '../dataflow/actions';
import Popcorn from '../assets/popcorn.svg';
import firebase, { facebookProvider, googleProvider } from '../utils/firebase';

const leftMenuItemStyle = { marginLeft: 'auto', borderRight: '1px solid rgba(34,36,38,.1)', borderLeft: 'none' };
const borderLeft = { borderLeft: '1px solid rgba(34,36,38,.1)' };

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

  const menuItemsToRender = (isAuth) => {
    if (!isAuth) {
      return (
        <Menu.Item style={leftMenuItemStyle}>
          <Modal size="mini" trigger={<Button color="blue">Login</Button>}>
            <Modal.Content>
              <div style={{ marginBottom: 20, textAlign: 'center' }}>
                <Image src={Popcorn} style={{ margin: 'auto', width: 45 }} />
                <p style={{ fontSize: 35, marginTop: 3, fontFamily: 'Inconsolata' }}><strong>what</strong>list</p>
              </div>
              <Form size="large">
                <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button color="blue" fluid disabled size="large">
                  Login
                </Button>
              </Form>
              <Divider horizontal>Or you can login with:</Divider>
              <div style={{ textAlign: 'center' }}>
                <Button circular color="facebook" icon="facebook" onClick={loginWithFacebook} />
                <Button circular color="google plus" icon="google" onClick={loginWithGoogle} />
                <Button circular color="twitter" icon="twitter" disabled />
              </div>
            </Modal.Content>
          </Modal>
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
        text: (
          <span>
            Signed in as <strong>{user.displayName}</strong>
          </span>
        ),
        disabled: true,
      },
      { key: 'user', text: 'Account', icon: 'user' },
      { key: 'settings', text: 'Settings', icon: 'settings' },
      {
        key: 'sign-out',
        text: (
          <span>
            <Dropdown.Divider />
            <Button fluid onClick={logout}>
              Logout
            </Button>
          </span>
        ),
      },
    ];

    return (
      <Menu.Item style={leftMenuItemStyle}>
        <Dropdown trigger={trigger} options={options} pointing="top right" icon={null} />
      </Menu.Item>
    );
  };

  return (
    <Menu fixed="top">
      <Container>
        <Link to="/">
          <Menu.Item as="span" style={borderLeft} header>
            <Image src={Popcorn} width="27" style={{ marginRight: '.3em' }} />
            <span style={{ fontFamily: 'Inconsolata', fontWeight: 400, fontSize: 20 }}><strong>what</strong>list</span>
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
