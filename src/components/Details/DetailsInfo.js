import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Image, Divider } from 'semantic-ui-react';

import { getImage } from '../../utils/api';
import { convertDate, convertMoney } from '../../utils/conversor';

import DetailsAditionalInfo from './DetailsAditionalInfo';

const InfoContainer = styled.div`
  display: flex;
  margin: 20px 10%;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const InfoItem = styled.div`
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 35px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0;

  @media (max-width: 992px) {
    text-align: center;
    margin-top: 15px !important;
  }
`;

const ReleaseDate = styled.h2`
  color: #808f85;
  font-size: 15px;
  font-weight: 400;
  margin-top: 0;
  font-family: 'Inconsolata';

  @media (max-width: 992px) {
    text-align: center;
  }
`;

const Overview = styled.p`
  font-size: 17px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #777da7;
  font-family: 'Inconsolata';
`;

const AditionalInfoContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DetailsInfo = ({ info, type }) => {
  const {
    name,
    title,
    poster_path,
    overview,
    genres,
    status,
    episode_run_time,
    release_date,
    vote_average,
    runtime,
    revenue,
    first_air_date,
  } = info;
  const genresName = genres.map(genre => genre.name).join(', ');
  const formatRevenue = rev => (rev ? convertMoney.format(rev) : '-');

  return (
    <InfoContainer>
      <Image
        style={{ maxWidth: 300, maxHeight: 450 }}
        centered
        bordered
        src={getImage(poster_path, 300)}
      />
      <InfoItem>
        <Title>{name || title}</Title>
        {(release_date || first_air_date) && (
          <ReleaseDate>
            {release_date
              ? `Released in ${convertDate(release_date)}`
              : `First release in ${convertDate(first_air_date)}`}
          </ReleaseDate>
        )}
        <Overview>{overview}</Overview>

        <Divider fitted />

        <AditionalInfoContainer>
          <DetailsAditionalInfo title="Ratings" content={`${vote_average} / 10`} />
          <DetailsAditionalInfo title="Genres" content={genresName} />
          <DetailsAditionalInfo
            title="Runtime"
            content={`${runtime || episode_run_time[0]} mins`}
          />
          {type === 'movie'
            ? <DetailsAditionalInfo title="Box Office" content={formatRevenue(revenue)} />
            : <DetailsAditionalInfo title="Status" content={status} />
          }
        </AditionalInfoContainer>
      </InfoItem>
    </InfoContainer>
  );
};

DetailsInfo.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsInfo;
