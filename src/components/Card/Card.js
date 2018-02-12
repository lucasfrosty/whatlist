/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';

import { getImage } from '../../utils/api';

const Container = styled.div`
  display: ${props => (props.hidden ? 'none' : 'block')};
  margin: 20px;
  max-width: 230px;
  transition: 1.5s;

  &:hover {
    max-width: 235px;
  }
`;

// const ReleaseDate = styled.p`
//   color: #808f85;
//   font-size: 11px;
// `;

const Rating = styled.span`
  position: absolute;
  color: white;
  float: right;
  top: 90%;
  left: 75%;
  font-weight: 800;
  font-size: 19px;
  text-align: center;

  .icon {
    margin-right: 0;
  }
`;

const Title = styled.span`
  position: absolute;
  color: white;
  top: 90%;
  padding-left: 7px;
  font-weight: 800;
  font-size: 19px;
  text-align: center;
`;

const CenteredIcon = styled.div`
  position: absolute;
  top: 50%;
  left: calc(50% - 2em);
  z-index: 3;
`;

class CardInfo extends Component {
  state = {
    isHovering: false,
  };

  onHoverHandler = () => {
    this.setState({
      isHovering: true,
    });
  };

  outHoverHandler = () => {
    this.setState({
      isHovering: false,
    });
  };

  truncateString = (str, len) => {
    if (str.length > len) {
      return `${str.substr(0, len)}...`;
    }

    return str;
  }

  render() {
    const {
      title,
      name,
      poster_path,
      type,
      id,
      vote_average,
    } = this.props.info;

    const { isHovering } = this.state;
    return (
      <Container hidden={this.props.hidden}>
        <Link to={`/details/${type}/${id}`}>
          <Card
            onMouseOver={this.onHoverHandler}
            onMouseOut={this.outHoverHandler}
            style={{ transition: '.5s', position: 'relative' }}
          >
            <Image
              size="medium"
              centered
              src={getImage(poster_path, 300)}
              style={isHovering ? { filter: 'brightness(30%)', transition: '.5s' } : null}
            />
            <div style={!isHovering ? { visibility: 'hidden' } : null}>
              <CenteredIcon>
                <Icon size="huge" style={{ color: '#fff', lineHeight: 0 }} name="zoom" />
              </CenteredIcon>
              <Rating>
                <Icon color="yellow" name="star" />
                {vote_average.toFixed(1)}
              </Rating>
              <Title>
                {title
                  ? this.truncateString(title, 16)
                  : this.truncateString(name, 16)
                }
              </Title>
            </div>
          </Card>
        </Link>
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
