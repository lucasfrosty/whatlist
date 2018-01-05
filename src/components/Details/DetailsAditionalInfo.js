import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AditionalInfoWrappedContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const Subtitle = styled.h2`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const Rating = styled.span`
  font-size: 15px;
  .icon {
    margin-right: 0;
  }
`;

const Genres = styled.span`
  font-family: 'Inconsolata';
  font-size: 15px;
  color: #808f85;
`;

const DetailsAditionalInfo = ({ title, content }) => (
  <AditionalInfoWrappedContainer>
    <Subtitle>{title}</Subtitle>
    <Rating>
      <Genres>{content}</Genres>
    </Rating>
  </AditionalInfoWrappedContainer>
);

DetailsAditionalInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default DetailsAditionalInfo;
