import React from 'react';
import PropTypes from 'prop-types';

import { getAPIData } from '../utils/api';

class Details extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
        id: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    info: undefined,
  }

  componentDidMount() {
    const { id, type } = this.props.match.params; 
    getAPIData(id, type, id)
      .then(res => this.setState({ info: res }));
  }

  render() {
    return (
      <code>
        <pre>
          {JSON.stringify(this.state.info, null, 3)}
        </pre>
      </code>
    );
  }
}



export default Details;
