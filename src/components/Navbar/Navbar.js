import React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import { Container, Menu } from 'semantic-ui-react';

import ContentInfoModal from '../ContentInfoModal';
import NavbarBrand from './NavbarBrand';
import NavbarLoginModal from './NavbarLoginModal';
import NavbarUserInfo from './NavbarUserInfo';
import NavbarSearchInput from './NavbarSearchInput';

import { getAPIData, convertGenresArray } from '../../utils/api';
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
    user: PropTypes.objectOf(PropTypes.any).isRequired,
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

  loginWithFacebook

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
        convertGenresArray([response.genre_ids], type).then((genresToString) => {
          this.setState({
            searchInfo: {
              ...response,
              type,
              genresToString: genresToString.join(', ').replace(/,/g, ', '),
            },
          });
        });
      });
  };

  render() {
    const { user } = this.props;
    const { isFetchingData, searchInfo } = this.state;
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

          {searchInfo !== undefined && (
            <ContentInfoModal info={searchInfo} clearSearchInfo={this.clearSearchInfo} />
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
