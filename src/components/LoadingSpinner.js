import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function LoadingSpinner() {
  return (
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>
  );
}

export default LoadingSpinner;
