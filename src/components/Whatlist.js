import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import LoadingSpinner from './LoadingSpinner';
import Card from './Card/Card';
import CardContainer from './Card/CardContainer';

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

  render() {
    const { firebaseData } = this.state;
    return firebaseData ? (
      <Container style={{ marginTop: 100 }}>
        <CardContainer>
          {Object.keys(firebaseData).map(key => <Card key={key} info={firebaseData[key]} />)}
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
