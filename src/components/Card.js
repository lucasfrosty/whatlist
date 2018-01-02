import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

import convertDate from '../utils/convertDate';
import { getImage } from '../utils/api';

const Container = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')};
  margin: 0 5px 30px 5px;
`;

const Rating = styled.span`
  float: right;
  font-size: 14px;
  .icon {
    margin-right: 0;
  }
`;

const Meta = styled.span`
  font-size: 12px;
`;

class CardInfo extends Component {
  truncateWord = (str, len) => {
    let trimmedString = str.substr(0, len);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));

    return trimmedString;
  }

  render() {
    const {
      title, name, release_date, overview, vote_average, backdrop_path, genresToString, type, id,
    } = this.props.info;
    return (
      <Container hidden={this.props.hidden}>
        <Card style={{ height: '100%' }}>
          <Link to={`/details/${type}/${id}`}>
            <Image fluid centered src={getImage(backdrop_path, 300)} />
          </Link>
          <Card.Content>
            <Card.Header>
              {title || name}
              <Rating>
                <Icon color="yellow" name="star" />
                {vote_average}
              </Rating>
            </Card.Header>
            <Card.Meta>
              <Meta>
                {release_date && `Released in ${convertDate(release_date)}`}
              </Meta>
            </Card.Meta>
            <Card.Description>
              <p>
                {overview.length > 120
                  ? `${this.truncateWord(overview, 120)}...`
                  : overview
                }
              </p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra style={{ padding: '0.3em 1em 0.6em' }}>
            <Meta>{genresToString}</Meta>
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
