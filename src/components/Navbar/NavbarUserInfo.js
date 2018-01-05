import React from 'react';
import PropTypes from 'prop-types';
import { Image, Dropdown, Button } from 'semantic-ui-react';

const NavbarUserInfo = ({ user, logout }) => {
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

  return <Dropdown trigger={trigger} options={options} pointing="top right" icon={null} />;
};


NavbarUserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
};

export default NavbarUserInfo;
