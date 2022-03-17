import React, { useState } from 'react';
import { Modal } from '../../context/modal';

import './index.css'
import EditChannelForm from '../editChannel';

function EditChannelModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className={'loginModalButton'} onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <EditChannelForm />
        </Modal>
      )}
    </>
  );
}

export default EditChannelModal;
