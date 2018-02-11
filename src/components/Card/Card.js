import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

import { getImage } from '../../utils/api';

const Container = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')};
  margin: 20px;
  max-width: 210px;
`;

// const Rating = styled.span`
//   float: right;
//   font-size: 14px;
//   .icon {
//     margin-right: 0;
//   }
// `;

class CardInfo extends Component {
  componentDidMount() {
  }

  render() {
    const {
      title, name, poster_path, type, id,
    } = this.props.info;
    return (
      <Container hidden={this.props.hidden}>
        <Card style={{ height: '100%' }}>
          <Link to={`/details/${type}/${id}`}>
            <Image
              size="medium"
              centered
              src={getImage(poster_path, 300)}
            />
          </Link>
          <Card.Content>
            <Card.Header textAlign="center" style={{ fontSize: 15 }}>
              {title || name}
            </Card.Header>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

CardInfo.defaultProps = {
  hidden: false,
};

CardInfo.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  hidden: PropTypes.bool,
};

export default CardInfo;
