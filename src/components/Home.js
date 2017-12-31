import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// pres components
import Card from './Card';

// data
import { getPopular, TYPES } from '../utils/api';
import { userLogin, userLogoff } from '../dataflow/actions';


class Home extends Component {
  state = {
    popularMovies: undefined,
    popularSeries: undefined,
  }

  componentDidMount() {
    getPopular(TYPES.movie).then(res => this.setState({ popularMovies: res }));
    // getPopular(TYPES.tv).then(r => this.setState({ popularSeries: r }));
  }

  render() {
    const { popularMovies } = this.state;
    return (
      <Fragment>
        <h1>To watch list;</h1>
        {popularMovies ? popularMovies.map(movie => <Card info={movie} />) : 'Loading...'}
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
