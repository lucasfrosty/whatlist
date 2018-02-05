import React from 'react';
import { Modal } from 'semantic-ui-react';

const ContentInfoModal = ({ info, clearSearchInfo }) => {
  return (
    <Modal open={Boolean(info)} onClose={clearSearchInfo} closeIcon>
      <h1>{info}</h1>
    </Modal>
  );
};

export default ContentInfoModal;
