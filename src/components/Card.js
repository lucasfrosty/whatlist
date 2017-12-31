import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

import convertDate from '../utils/convertDate';
import { convertAndDisplayGenres } from '../utils/api';

const CardInfo = ({
  info: {
    title, name, release_date, overview, genre_ids, type, vote_average,
  },
}) => {
  const convertedGenres = () => {
    convertAndDisplayGenres(genre_ids, type, '#genres');
  };
  return (
    <Card>
      <Image src="/assets/images/avatar/large/matthew.png" />
      <Card.Content>
        <Card.Header>{title || name}</Card.Header>
        <Card.Meta>
          <span className="date">{release_date && `Released in ${convertDate(release_date)}`}</span>
        </Card.Meta>
        <Card.Description>{overview}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
    </Card>
  );
};

export default CardInfo;
