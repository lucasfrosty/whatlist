import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { Tab, Container, Button } from 'semantic-ui-react';

// pres components
import Card from './Card';

// data
import { getPopular, TYPES } from '../utils/api';
import { userLogin, userLogoff } from '../dataflow/actions';

/* eslint-disable no-unused-expressions */
injectGlobal`
  #root {
    background-color: #E9EAEE;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

    const shouldLoad = (content === undefined);

    return (
      <Tab.Pane loading={shouldLoad}>
        {shouldLoad || (
          <CardContainer>
            {displayCards(content)}
          </CardContainer>
        )}
      </Tab.Pane>
    );
  }

  render() {
    const { popularMovies, popularTV } = this.state;
    const panes = [
      { menuItem: <Button inverted compact size="small" color="blue">Popular TV Series</Button>, render: () => this.renderTabPane(popularTV) },
      { menuItem: <Button inverted compact size="small" color="blue">Popular Movies</Button>, render: () => this.renderTabPane(popularMovies) },
    ];

    return (
      <Container>
        <Tab
          menu={{ attached: false, secondary: true, widths: 2 }}
          style={{ paddingTop: 80 }}
          panes={panes}
        />
      </Container>
    );
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
