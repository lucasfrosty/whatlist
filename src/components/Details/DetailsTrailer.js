import React from 'react';
import { Divider, Embed } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  margin: 20px 10%;
  flex-direction: column;
`;

const EmbedContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const embedItemStyle = {
  width: 350,
  height: 212,
  margin: 10,
  padding: 0,
};

const DetailsTrailer = ({ videos }) => (
  <Container>
    <Divider horizontal><span style={{ fontSize: 30 }}>Videos</span></Divider>
    <EmbedContainer>
      {videos.results.map(video => (
        <Embed
          id={video.key}
          iframe={{
            style: {
              width: 350,
              height: 212,
            },
          }}
          style={embedItemStyle}
          source="youtube"
          active
          autoplay={false}
        />
      ))}
    </EmbedContainer>
  </Container>
);

DetailsTrailer.propTypes = {
  videos: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsTrailer;
