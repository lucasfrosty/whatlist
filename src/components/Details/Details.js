import React from 'react';
import PropTypes from 'prop-types';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import { getAPIData } from '../../utils/api';

// components
import DetailsVideo from './DetailsVideo';
import DetailsInfo from './DetailsInfo';

const containerStyles = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d5',
  paddingTop: 80,
};

class Details extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    info: undefined,
  };

  componentDidMount() {
    const { id, type } = this.props.match.params;
    getAPIData(id, type, 'id').then((res) => {
      console.log(res);
      this.setState({ info: res });
    });
  }

  render() {
    const { type } = this.props.match.params;
    const { info } = this.state;

    if (info) {
      const { videos } = info;
      return (
        <Container style={containerStyles}>
          <DetailsInfo info={info} type={type} />
          {videos.results.length > 0 ? <DetailsVideo videos={videos} /> : null}
        </Container>
      );
    }

    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }
}

export default Details;
