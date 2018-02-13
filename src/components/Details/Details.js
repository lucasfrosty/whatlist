import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import LoadingSpinner from '../LoadingSpinner';
import { getAPIData } from '../../utils/api';

// components
import DetailsVideo from './DetailsVideo';
import DetailsInfo from './DetailsInfo';

const containerStyles = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d5',
  marginTop: 80,
};

class Details extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
        id: PropTypes.string,
      }),
    }).isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
      photoURL: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
      providerId: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: null,
  };

  state = {
    info: undefined,
    keyOnWhatlist: null,
  };

  componentDidMount() {
    const { id, type } = this.props.match.params;
    getAPIData(id, type, 'id').then((info) => {
      let keyOnWhatlist = null;
      firebase
        .database()
        .ref(this.props.user.uid)
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((key) => {
            const idValue = key.val().id;
            console.log(idValue === info.id);
            if (idValue === info.id) {
              keyOnWhatlist = idValue;
            }
          });
        })
        .then(() => this.setState({ info, keyOnWhatlist }));
    });
  }

  addToWhatlist = (info) => {
    firebase
      .database()
      .ref(this.props.user.uid)
      .push()
      .set(info);
  };

  removeOfWhatlist = () => {
  };

  render() {
    const { type } = this.props.match.params;
    const { info, keyOnWhatlist } = this.state;

    if (info) {
      const { videos } = info;
      return (
        <Container style={containerStyles}>
          <DetailsInfo
            info={info}
            type={type}
            addToWhatlist={this.addToWhatlist}
            keyOnWhatlist={keyOnWhatlist}
            removeOfWhatlist={this.removeOfWhatlist}
            auth={Boolean(this.props.user)}
          />
          {videos.results.length > 0 ? <DetailsVideo videos={videos} /> : null}
        </Container>
      );
    }

    return <LoadingSpinner />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Details);
