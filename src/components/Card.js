import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';

import convertDate from '../utils/convertDate';
import { convertGenres, getImage } from '../utils/api';

const Rating = styled.span`
  float: right;
  font-size: 14px;
  .icon {
    margin-right: 0;
  }
`;


class CardInfo extends Component {
  state = {
    genresToString: undefined,
  }

  componentDidMount() {
    const { type, genre_ids } = this.props.info;
    convertGenres(genre_ids, type)
      .then(genres => this.setState({ genresToString: genres }));
  }


  render() {
    console.log(this.props.info);
    const {
      title, name, release_date, overview, vote_average, poster_path,
    } = this.props.info;
    return (
      <Card>
        <Image src={getImage(poster_path, 300)} />
        <Card.Content>
          <Card.Header>
            {title || name}
            <Rating>
              <Icon color="yellow" name="star" />
              {vote_average}
            </Rating>
          </Card.Header>
          <Card.Meta>
            <span className="date">{release_date && `Released in ${convertDate(release_date)}`}</span>
          </Card.Meta>
          <Card.Description>{overview}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>{this.state.genresToString}</p>
        </Card.Content>
      </Card>
    );
  }
}

CardInfo.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardInfo;
