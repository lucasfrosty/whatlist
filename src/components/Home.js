import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dimmer, Loader, Tab } from 'semantic-ui-react';

// pres components
import Card from './Card';

// data
import { getPopular, TYPES } from '../utils/api';
import { userLogin, userLogoff } from '../dataflow/actions';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* width: 95%; */
  margin: auto;
`;

class Home extends Component {
  state = {
    popularMovies: undefined,
    popularTV: undefined,
  };

  componentDidMount() {
    getPopular(TYPES.movie).then(res => this.setState({ popularMovies: res }));
    getPopular(TYPES.tv).then(res => this.setState({ popularTV: res }));
  }


  renderTabPane = (content) => {
    const displayCards = contentArray =>
      contentArray.map((movie, index) => <Card hidden={index >= 10} key={movie.id} info={movie} />);

    if (content === undefined) {
      return (
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      );
    }

    return (
      <Tab.Pane>
        <CardContainer>
          {displayCards(content)}
        </CardContainer>
      </Tab.Pane>
    );
  }

  render() {
    const { popularMovies, popularTV } = this.state;
    const panes = [
      { menuItem: 'Movies', render: () => this.renderTabPane(popularMovies) },
      { menuItem: 'TV', render: () => this.renderTabPane(popularTV) },
    ];

    return <Tab panes={panes} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  onUserLogin: userLogin,
  onUserLogoff: userLogoff,
};

Home.propTypes = {
  auth: PropTypes.bool.isRequired,
  onUserLogin: PropTypes.func.isRequired,
  onUserLogoff: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
