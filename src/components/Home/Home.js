import React, { Component } from 'react';

// components
import HomeComponents from './HomeComponents';

// data
import { getPopular, TYPES } from '../../utils/api';

class Home extends Component {
  state = {
    popularMoviesInfo: undefined,
    popularTVInfo: undefined,
  };

  // getting both the Popular Movies and the Popular TV shows
  componentDidMount() {
    getPopular(TYPES.movie)
      .then((res) => this.setState({ popularMoviesInfo: res }))
      .catch((err) => console.error(err));

    getPopular(TYPES.tv)
      .then((res) => this.setState({ popularTVInfo: res }))
      .catch((err) => console.log(err));
  }

  render() {
    const { popularMoviesInfo, popularTVInfo } = this.state;
    return <HomeComponents popularMoviesInfo={popularMoviesInfo} popularTVInfo={popularTVInfo} />;
  }
}

export default Home;
