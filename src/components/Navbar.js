import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Image, Menu, Button, Icon } from 'semantic-ui-react';

import Popcorn from '../assets/popcorn.svg';

const leftMenuItemStyle = { marginLeft: 'auto', borderLeft: '1px solid rgba(34,36,38,.1)' };
const borderLeft = { borderLeft: '1px solid rgba(34,36,38,.1)' };

const Navbar = ({ auth }) => {
  const menuItemsToRender = (isAuth) => {
    if (!isAuth) {
      return (
        <Menu.Item style={leftMenuItemStyle}>
          <Button color="facebook">
            <Icon name="facebook" /> Login with Facebook
          </Button>
        </Menu.Item>
      );
    }

    return <h1>xDD</h1>;
  };

  return (
    <Menu fixed="top" size="medium">
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
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
