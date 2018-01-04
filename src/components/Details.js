import React from 'react';
import PropTypes from 'prop-types';
import { Container, Dimmer, Loader, Image, Icon, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

import { getAPIData, getImage } from '../utils/api';
import { convertDate, convertMoney } from '../utils/conversor';

const containerStyles = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d5',
  paddingTop: 80,
};

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

const Subtitle = styled.h2`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const ReleaseDate = styled.h2`
  color: #808f85;
  font-size: 15px;
  font-weight: 400;
  margin-top: 0;
  font-family: 'Inconsolata';

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const InfoFlexContainer = styled.div`
  display: flex;
  margin: 20px 10%;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const InfoFlexItem = styled.div`
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const Overview = styled.p`
  font-size: 17px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #777da7;
  font-family: 'Inconsolata';
`;

const Rating = styled.span`
  font-size: 15px;
  .icon {
    margin-right: 0;
  }
`;

const AditionalContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AditionalWrappedContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const Genres = styled.span`
  font-family: 'Inconsolata';
  font-size: 15px;
  color: #808f85;
`;

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

  componentToDisplay = () => {
    if (this.state.info) {
      const { type } = this.props.match.params;
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
      } = this.state.info;

      const genresName = genres.map(genre => genre.name).join(', ');
      return (
        <Container style={containerStyles}>
          <InfoFlexContainer>
            <Image fluid={false} centered bordered src={getImage(poster_path, 300)} />
            <InfoFlexItem>
              <Title>{name || title}</Title>
              {(release_date || first_air_date) && (
                <ReleaseDate>
                  {type === 'tv'
                    ? release_date && `Released in ${convertDate(release_date)}`
                    : first_air_date && `First release in ${convertDate(first_air_date)}`}
                </ReleaseDate>
              )}
              <Overview>{overview}</Overview>

              <Divider fitted />

              <AditionalContainer>
                <AditionalWrappedContainer>
                  <Subtitle>Ratings</Subtitle>
                  <Rating>
                    <Icon color="yellow" name="star" />
                    <Genres>
                      {vote_average}
                    </Genres>
                  </Rating>
                </AditionalWrappedContainer>

                <AditionalWrappedContainer>
                  <Subtitle>Genres</Subtitle>
                  <Rating>
                    <Genres>{genresName}</Genres>
                  </Rating>
                </AditionalWrappedContainer>

                <AditionalWrappedContainer>
                  <Subtitle>Runtime</Subtitle>
                  <Rating>
                    <Genres>{`${runtime || episode_run_time[0]} mins`}</Genres>
                  </Rating>
                </AditionalWrappedContainer>

                <AditionalWrappedContainer>
                  <Subtitle>{type === 'movie' ? 'Box office' : 'Status'}</Subtitle>
                  <Rating>
                    <Genres>
                      {/* TODO: fix it */}
                      {type === 'movie'
                        ? (revenue ? convertMoney.format(revenue) : '-')
                        : status
                      }
                    </Genres>
                  </Rating>
                </AditionalWrappedContainer>
              </AditionalContainer>
            </InfoFlexItem>
          </InfoFlexContainer>
        </Container>
      );
    }

    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  };

  render() {
    return this.componentToDisplay();
  }
}

export default Details;
