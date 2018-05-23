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
  };

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

    firebase.auth().signInWithPopup(prov)
      .then((result) => {
        this.props.onUserLogin({
          user: result.user.providerData[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  logout = () => {
    firebase.auth().signOut()
      .then(() => {
        this.props.onUserLogoff();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchData = async (inputValue, type) => {
    const arrayResponse = await getAPIData(inputValue, type, 'query');
    const firstItemOnResponse = arrayResponse[0];
    this.props.history.push(`/details/${type}/${firstItemOnResponse.id}`);
  };

  displayLoginOrProfileButton = () => (
    this.props.user === null
      ? <NavbarLoginModal loginWithProvider={this.loginWithProvider} />
      : <NavbarUserInfo user={this.props.user} logout={this.logout} />
  );

  render() {
    return (
      <Menu fixed="top">
        <Container>
          <NavbarBrand />
          <Menu.Item style={searchItemStyle}>
            <NavbarSearchInput
              fetchData={this.fetchData}
              isFetchingData={this.state.isFetchingData}
            />
          </Menu.Item>
          <Menu.Item>
            {this.displayLoginOrProfileButton()}
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  onUserLogin: userLogin,
  onUserLogoff: userLogoff,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
