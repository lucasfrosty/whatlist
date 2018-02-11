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
  };

  componentDidMount() {
    const { id, type } = this.props.match.params;
    getAPIData(id, type, 'id').then((res) => {
      this.setState({ info: res });
    });
  }

  componentDidUpdate(prevProps) {
    const { id, type } = this.props.match.params;

    if (id !== prevProps.match.params.id && type !== prevProps.match.params.id) {
      getAPIData(id, type, 'id').then((res) => {
        this.setState({ info: res });
      });
    }
  }

  addToWhatlistHandler = (info) => {
    const ref = firebase.database().ref(this.props.user.uid);
    ref.on('value', (snapshot) => {
      let bool;
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().id === info.id) {
          bool = true;
        }
      });

      if (!bool) {
        ref.push().set(info);
      }
    });
  };

  render() {
    const { type } = this.props.match.params;
    const { info } = this.state;

    if (info) {
      const { videos } = info;
      return (
        <Container style={containerStyles}>
          <DetailsInfo
            info={info}
            type={type}
            addToWhatlistHandler={this.addToWhatlistHandler}
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
