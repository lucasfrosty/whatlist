import React from 'react';
import PropTypes from 'prop-types';
import { Container, Dimmer, Loader, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import { getAPIData, getImage } from '../utils/api';
import convertDate from '../utils/convertDate';

const containerStyles = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d5',
  paddingTop: 80,
};

const Title = styled.h1`
  font-size: ${props => props.size || '35'}px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 15px !important;
  }
`;

const ReleaseDate = styled.h2`
  color: #808F85;
  font-size: 15px;
  font-weight: 400;
  margin-top: 0;
  font-family: 'Inconsolata';
`;

const InfoFlexContainer = styled.div`
  display: flex;
  margin: 20px 10%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoFlexItem = styled.div`
  margin: 10px 20px;
`;

const Overview = styled.p`
  font-size: 17px;
  margin-top: 20px;
  color: #777DA7;
  font-family: 'Inconsolata';
`;

const Rating = styled.span`
  font-size: 14px;
  .icon {
    margin-right: 0;
  }
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
      const {
        name,
        title,
        poster_path,
        overview,
        genres,
        release_date,
        vote_average,
      } = this.state.info;

      const genresName = genres.map(genre => genre.name).join(', ');
      return (
        <Container style={containerStyles}>
          <InfoFlexContainer>
            <Image fluid={false} centered bordered src={getImage(poster_path, 300)} />
            <InfoFlexItem>
              <Title>{name || title}</Title>
              {release_date && (
                <ReleaseDate>
                  {release_date && `Released in ${convertDate(release_date)}`}
                </ReleaseDate>
              )}                                            
              <Overview>{overview}</Overview>

              <Title size="20">Ratings</Title>
                <Rating>
                  <Icon color="yellow" name="star" />
                  {vote_average}
                </Rating>

              <p>{genresName}</p>
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
