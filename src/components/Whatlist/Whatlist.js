import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import LoadingSpinner from '../LoadingSpinner';
import Card from '../Card/Card';
import CardContainer from '../Card/CardContainer';
import CustomContainer from '../CustomContainer';
import EmptyWhatlistMsg from './EmptyWhatlistMsg';

class Whatlist extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  state = {
    firebaseData: {},
    isFetchingData: true,
  };

  removeButtonHandler = (key) => {
    firebase
      .database()
      .ref(this.props.userId)
      .child(key)
      .remove();
  };

  componentDidMount() {
    firebase
      .database()
      .ref(this.props.userId)
      .on('value', (snapshot) => {
        this.setState({
          firebaseData: snapshot.val() || {},
          isFetchingData: false,
        });
      });
  }

  render() {
    const { isFetchingData, firebaseData } = this.state;
    const isFirebaseDataAnEmptyObject =
      (Object.keys(firebaseData).length === 0) && (firebaseData.constructor === Object);

    const whatlist = (
      isFirebaseDataAnEmptyObject
      ? <EmptyWhatlistMsg />
      : (
        <CardContainer>
          {Object.keys(firebaseData).map((key) => (
            <Card
              showRemoveButton
              key={key}
              objKey={key}
              info={firebaseData[key]}
              removeButtonHandler={this.removeButtonHandler}
            />
          ))}
        </CardContainer>
      )
    );

    return (
      isFetchingData
      ? <LoadingSpinner />
      : (
        <CustomContainer>
          {whatlist}
        </CustomContainer>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user.uid,
  };
}

export default connect(mapStateToProps, null)(Whatlist);
