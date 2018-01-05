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

  componentDidMount() {
    getPopular(TYPES.movie).then(res => this.setState({ popularMoviesInfo: res }));
    getPopular(TYPES.tv).then(res => this.setState({ popularTVInfo: res }));
  }

  render() {
    const { popularMoviesInfo, popularTVInfo } = this.state;
    return <HomeComponents popularMoviesInfo={popularMoviesInfo} popularTVInfo={popularTVInfo} />;
  }
}

export default Home;
