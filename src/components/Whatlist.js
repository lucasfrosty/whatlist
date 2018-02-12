import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import LoadingSpinner from './LoadingSpinner';
import Card from './Card/Card';
import CardContainer from './Card/CardContainer';

const containerStyles = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d5',
  marginTop: 80,
};

class Whatlist extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  state = {
    firebaseData: undefined,
  };

  componentDidMount() {
    firebase
      .database()
      .ref(this.props.userId)
      .once('value')
      .then((snapshot) => {
        this.setState({
          firebaseData: snapshot.val(),
        });
      });
  }

  removeButtonHandler = (key) => {
    firebase.database().ref(this.props.userId).child(key).remove();
  }

  render() {
    const { firebaseData } = this.state;
    return firebaseData ? (
      <Container style={containerStyles}>
        <CardContainer>
          {Object.keys(firebaseData).map(key => (
            <Card
              showRemoveButton
              key={key}
              objKey={key}
              info={firebaseData[key]}
              removeButtonHandler={this.removeButtonHandler}
            />
          ))}
        </CardContainer>
      </Container>
    ) : (
      <LoadingSpinner />
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.uid,
});

export default connect(mapStateToProps, null)(Whatlist);
