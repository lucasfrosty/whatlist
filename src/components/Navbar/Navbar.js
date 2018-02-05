import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

import ContentInfoModal from '../ContentInfoModal';
import NavbarBrand from './NavbarBrand';
import NavbarLoginModal from './NavbarLoginModal';
import NavbarUserInfo from './NavbarUserInfo';
import NavbarSearchInput from './NavbarSearchInput';

import { getAPIData } from '../../utils/api';
import { userLogin, userLogoff } from '../../dataflow/actions';
import firebase, { facebookProvider, googleProvider } from '../../utils/firebase';

const searchItemStyle = {
  marginLeft: 'auto',
  borderRight: '1px solid rgba(34,36,38,.1)',
  borderLeft: 'none',
  paddingTop: 5,
  paddingBottom: 5,
};

class Navbar extends React.Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.any).isRequired,
    auth: PropTypes.bool.isRequired,
    onUserLogin: PropTypes.func.isRequired,
    onUserLogoff: PropTypes.func.isRequired,
  };

  state = {
    searchInfo: undefined,
    isFetchingData: false,
  };

  clearSearchInfo = () => {
    this.setState({
      searchInfo: undefined,
    });
  };

  loginWithFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const {
          name, email, photoURL, displayName,
        } = result.user;

        this.props.onUserLogin({
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

  loginWithGoogle = () => {
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
        this.setState({
          searchInfo: {
            ...response,
            type,
          },
        });
      });
  };

  render() {
    const { user, auth } = this.props;
    const { isFetchingData, searchInfo } = this.state;
    return (
      <Menu fixed="top">
        <Container>
          <NavbarBrand />
          <Menu.Item style={searchItemStyle}>
            <NavbarSearchInput fetchData={this.fetchData} isFetchingData={isFetchingData} />
          </Menu.Item>
          <Menu.Item>
            {auth ? (
              <NavbarUserInfo user={user} logout={this.logout} />
            ) : (
              <NavbarLoginModal
                loginWithFacebook={this.loginWithFacebook}
                loginWithGoogle={this.loginWithGoogle}
              />
            )}
          </Menu.Item>

          {searchInfo !== undefined && (
            <ContentInfoModal info={searchInfo} clearSearchInfo={this.clearSearchInfo} />
          )}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {
  onUserLogin: userLogin,
  onUserLogoff: userLogoff,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
