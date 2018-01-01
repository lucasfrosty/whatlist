import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';

// pres components
import Card from './Card';

// data
import { getPopular, TYPES } from '../utils/api';
import { userLogin, userLogoff } from '../dataflow/actions';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;


class Home extends Component {
  state = {
    popularMovies: undefined,
    // popularSeries: undefined,
  }

  componentDidMount() {
    getPopular(TYPES.movie)
      .then(res => this.setState({ popularMovies: res }));


    // getPopular(TYPES.tv).then(r => this.setState({ popularSeries: r }));
  }

  render() {
    const { popularMovies } = this.state;
    return (
      <Fragment>
        <h1>To watch list;</h1>
        <CardContainer>
          {popularMovies
            ? popularMovies.map(movie => <Card key={movie.id} info={movie} />)
            : (
              <Dimmer active inverted>
                <Loader>Loading...</Loader>
              </Dimmer>
            )
          }
        </CardContainer>
      </Fragment>
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
