import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Container = styled.div`
  text-align: center;
  padding: 25px;
`;

const EmptyWhatlistMsg = () => (
  <Container>
    <h2>Your whatlist is empty.</h2>
    <p>
      Don&apos;t you have a movie or a TV show that you really wanna watch?<br />
      If you don&apos;t, try to discover some cool content on our <strong>discover</strong> section
    </p>
    <Link to="/">
      <Button color="blue">Discover</Button>
    </Link>
  </Container>
);

export default EmptyWhatlistMsg;
