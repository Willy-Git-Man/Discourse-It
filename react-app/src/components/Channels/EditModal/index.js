import React, { useState } from 'react';
import { Modal } from '../../context/modal';

import './index.css'
import EditChannelForm from '../editChannel';

function EditChannelModal({channelId}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="editDeleteChannelDiv">
      <button className={'editChannelButton'} onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <EditChannelForm channelId={channelId} />
        </Modal>
      )}
    </div>
  );
}

export default EditChannelModal;
