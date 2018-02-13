import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AditionalInfoWrappedContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

const Title = styled.h2`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const Content = styled.span`
  font-family: 'Inconsolata';
  font-size: 15px;
  color: #808f85;
`;

const DetailsAditionalInfo = ({ title, content }) => (
  <AditionalInfoWrappedContainer>
    <Title>{title}</Title>
    <Content>{content}</Content>
  </AditionalInfoWrappedContainer>
);

DetailsAditionalInfo.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default DetailsAditionalInfo;
