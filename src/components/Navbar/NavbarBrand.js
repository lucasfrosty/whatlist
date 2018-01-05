import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Popcorn from '../../assets/popcorn.svg';

const borderLeft = { borderLeft: '1px solid rgba(34,36,38,.1)' };

const NavbarBrand = () => (
  <Link to="/">
    <Menu.Item as="span" style={borderLeft} header>
      <Image src={Popcorn} width="27" style={{ marginRight: '.3em' }} />
      <span style={{ fontFamily: 'Inconsolata', fontWeight: 400, fontSize: 20 }}>
        <strong>what</strong>list
      </span>
    </Menu.Item>
  </Link>
);

export default NavbarBrand;
