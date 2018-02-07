import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image, Dropdown, Button } from 'semantic-ui-react';

const NavbarUserInfo = ({ user, logout, history }) => {
  const trigger = (
    <span>
      <Image src={user.photoURL} avatar />
    </span>
  );

  console.log(history);

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
    {
      key: 'user',
      text: 'Account',
      icon: 'user',
      active: '',
    },
    {
      key: 'settings',
      text: 'Settings',
      icon: 'settings',
      active: '',
    },
    {
      key: 'whatlist',
      text: 'whatlist',
      icon: 'list layout',
      active: '',
      onClick: () => history.push('/whatlist'),
    },
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
};

export default withRouter(NavbarUserInfo);
