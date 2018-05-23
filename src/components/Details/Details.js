import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import LoadingSpinner from '../LoadingSpinner';
import { getAPIData } from '../../utils/api';

// components
import DetailsVideo from './DetailsVideo';
import DetailsInfo from './DetailsInfo';
import CustomContainer from '../CustomContainer';

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
    isFetchingData: false,
  };

  setIsFetchingDataToTrue = () => this.setState({ isFetchingData: true });

    /**
   * @description will add a content to the user's whatlist
   * @param {object} info - the content basic information (just what'll be displayed on the card)
   * @memberof Details
   */
  addToWhatlist = (info) => {
    firebase
      .database()
      .ref(this.props.user.uid)
      .push()
      .set(info)
      .then(() => this.setState({ isFetchingData: false }))
      .catch((err) => console.error(err));
  };

  /**
   * @description return a content from whatlist
   * @param {string} key - the key reference of the content in the user's Object on Firebase
   * @memberof Details
   */
  removeOfWhatlist = (key) => {
    firebase
      .database()
      .ref(this.props.user.uid)
      .child(key)
      .remove()
      .then(() => this.setState({ isFetchingData: false }))
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    const { id, type } = this.props.match.params;
    getAPIData(id, type, 'id').then(async (info) => {
      let keyOnWhatlist = null;

      if (this.props.user) {
        // this will check if the Content are already on the whatlist or not
        const snapshot = await firebase.database().ref(this.props.user.uid).once('value');
        await snapshot.forEach((key) => {
          if (key.val().id === info.id) {
            keyOnWhatlist = key.key;
          }
        });
        this.setState({ info, keyOnWhatlist });
      } else {
        // here, there's no reason to do the check because the whatlist doesn't exists (since there's no user)
        this.setState({ info, keyOnWhatlist });
      }

    }).catch((err) => console.error(err));
  }

  componentDidUpdate(prevProps) {
    const { id, type } = this.props.match.params;

    if (id !== prevProps.match.params.id && type !== prevProps.match.params.id) {
      getAPIData(id, type, 'id')
        .then((res) => {
          this.setState({ info: res });
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { type } = this.props.match.params;
    const { info, keyOnWhatlist, isFetchingData } = this.state;

    if (info) {
      const { videos } = info;
      const renderVideos = videos.results.length > 0 ? <DetailsVideo videos={videos} /> : null;
      return (
        <CustomContainer>
          <DetailsInfo
            info={info}
            type={type}
            addToWhatlist={this.addToWhatlist}
            keyOnWhatlist={keyOnWhatlist}
            removeOfWhatlist={this.removeOfWhatlist}
            auth={Boolean(this.props.user)}
            setIsFetchingDataToTrue={this.setIsFetchingDataToTrue}
            isFetchingData={isFetchingData}
          />
          {renderVideos}
        </CustomContainer>
      );
    }

    return <LoadingSpinner />;
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, null)(Details);
