// NOT USING THIS
// KEEPING FOR REMINDING PURPOSES
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

import Card from './Card/Card';

function ContentInfoModal({ info, clearSearchInfo }) {
  return (
    <Modal open={Boolean(info)} basic size="mini" onClose={clearSearchInfo}>
      <Card info={info} clearSearchInfo={clearSearchInfo} />
    </Modal>
  );
}

ContentInfoModal.propTypes = {
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  clearSearchInfo: PropTypes.func.isRequired,
};

export default ContentInfoModal;
