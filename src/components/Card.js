import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

import convertDate from '../utils/convertDate';
import { convertGenres, getImage } from '../utils/api';

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
  state = {
    genresToString: undefined,
  };

  componentDidMount() {
    const { type, genre_ids } = this.props.info;
    convertGenres(genre_ids, type).then(genres => this.setState({ genresToString: genres }));
  }

  truncateWord = (str, len) => {
    let trimmedString = str.substr(0, len);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));

    return trimmedString;
  }

  render() {
    const {
      title, name, release_date, overview, vote_average, backdrop_path,
    } = this.props.info;
    console.log(this.props.info);
    return (
      <div style={{ marginBottom: 30 }}>
        <Card style={{ height: '100%' }}>
          <Image size="medium" fluid centered src={getImage(backdrop_path, 300)} />
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
              {/* <Button size="mini" content="Details" color="teal" /> */}
            </Card.Description>
          </Card.Content>
          <Card.Content extra style={{ padding: '0.3em 1em 0.6em' }}>
            <Meta>{this.state.genresToString}</Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

CardInfo.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardInfo;
