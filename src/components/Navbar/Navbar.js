import React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

// import ContentInfoModal from '../ContentInfoModal';
import NavbarBrand from './NavbarBrand';
import NavbarLoginModal from './NavbarLoginModal';
import NavbarUserInfo from './NavbarUserInfo';
import NavbarSearchInput from './NavbarSearchInput';

import { getAPIData } from '../../utils/api';
import { userLogin, userLogoff } from '../../dataflow/actions';
import { facebookProvider, googleProvider, twitterProvider } from '../../utils/firebase';

const searchItemStyle = {
  marginLeft: 'auto',
  borderRight: '1px solid rgba(34,36,38,.1)',
  borderLeft: 'none',
  paddingTop: 5,
  paddingBottom: 5,
};

class Navbar extends React.Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    onUserLogin: PropTypes.func.isRequired,
    onUserLogoff: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static defaultProps = {
    user: null,
  }

  state = {
    isFetchingData: false,
  };

  loginWithProvider = (provider) => {
    let prov;
    if (provider === 'google') {
      prov = googleProvider;
    } else if (provider === 'twitter') {
      prov = twitterProvider;
    } else {
      prov = facebookProvider;
    }

    firebase
      .auth()
      .signInWithPopup(prov)
      .then((result) => {
        console.log(result);
        this.props.onUserLogin({
          user: result.user.providerData[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.onUserLogoff();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchData = (inputValue, type) => {
    getAPIData(inputValue, type, 'query')
      .then(arrayResponse => arrayResponse[0])
      .then((response) => {
        this.props.history.push(`/details/${type}/${response.id}`);
      });
  };

  render() {
    const { user } = this.props;
    const { isFetchingData } = this.state;
    return (
      <Menu fixed="top">
        <Container>
          <NavbarBrand />
          <Menu.Item style={searchItemStyle}>
            <NavbarSearchInput fetchData={this.fetchData} isFetchingData={isFetchingData} />
          </Menu.Item>
          <Menu.Item>
            {user !== null ? (
              <NavbarUserInfo user={user} logout={this.logout} />
            ) : (
              <NavbarLoginModal
                loginWithProvider={this.loginWithProvider}
              />
            )}
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  onUserLogin: userLogin,
  onUserLogoff: userLogoff,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
