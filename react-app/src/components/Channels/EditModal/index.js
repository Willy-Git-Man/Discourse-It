import React, { useState } from 'react';
import { Modal } from '../../context/modal';

import './index.css'
import EditChannelForm from '../editChannel';

function EditChannelModal({channelId}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className={'editChannelButton'} onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <EditChannelForm channelId={channelId} />
        </Modal>
      )}
    </>
  );
}

export default EditChannelModal;
