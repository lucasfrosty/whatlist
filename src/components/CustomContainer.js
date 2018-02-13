import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const containerStyles = {
  backgroundColor: '#fff',
  border: '1px solid #d4d4d5',
  marginTop: 80,
};

const CustomContainer = ({ children }) => <Container style={containerStyles}>{children}</Container>;

CustomContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
};

export default CustomContainer;
