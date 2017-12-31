import React from 'react';

const Card = ({ info }) => (
  <pre>
    <code>
      {JSON.stringify(info, null, 3)}
    </code>
  </pre>
);

export default Card;
