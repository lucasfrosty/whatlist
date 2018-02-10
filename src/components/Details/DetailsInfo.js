import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Image,
  Divider,
  Button,
  Icon,
} from 'semantic-ui-react';

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

const DetailsInfo = ({ info, type, addToWhatlistHandler, auth }) => {
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
    id,
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

          {auth && (
            <Button
              inverted
              color="green"
              onClick={() => addToWhatlistHandler({
                id,
                title: title || '',
                name: name || '',
                vote_average,
                type,
              })}
              style={{ marginTop: 30, display: 'flex', padding: 14 }}
            >
              <Icon name="plus" style={{ fontSize: 14 }} />
              <span style={{ letterSpacing: 0.8, fontSize: 12 }}>
                ADD TO WHATLIST
              </span>
            </Button>
          )}

        </AditionalInfoContainer>
      </InfoItem>
    </InfoContainer>
  );
};

DetailsInfo.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  addToWhatlistHandler: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
};

export default DetailsInfo;
