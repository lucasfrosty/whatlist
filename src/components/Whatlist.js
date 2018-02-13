import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import LoadingSpinner from './LoadingSpinner';
import Card from './Card/Card';
import CardContainer from './Card/CardContainer';
import CustomContainer from './CustomContainer';

class Whatlist extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  state = {
    firebaseData: {},
    isFetchingData: true,
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

  removeButtonHandler = (key) => {
    firebase
      .database()
      .ref(this.props.userId)
      .child(key)
      .remove();
  };

  render() {
    const { isFetchingData, firebaseData } = this.state;
    const isFirebaseDataAnEmptyObject =
      Object.keys(firebaseData).length === 0 && firebaseData.constructor === Object;

    return !isFetchingData ? (
      <CustomContainer>
        <CardContainer>
          {isFirebaseDataAnEmptyObject ? (
            <h1>:)</h1>
          ) : (
            Object.keys(firebaseData).map(key => (
              <Card
                showRemoveButton
                key={key}
                objKey={key}
                info={firebaseData[key]}
                removeButtonHandler={this.removeButtonHandler}
              />
            ))
          )}
        </CardContainer>
      </CustomContainer>
    ) : (
      <LoadingSpinner />
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.uid,
});

export default connect(mapStateToProps, null)(Whatlist);
