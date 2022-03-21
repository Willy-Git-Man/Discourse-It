import React, { useState } from 'react';
import { Modal } from '../../context/modal';

import PostChannelForm from '../postChannel';

function CreateChannelModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className={'loginModalButton'} onClick={() => setShowModal(true)}>Create Channel</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <PostChannelForm />
        </Modal>
      )}
    </>
  );
}

export default CreateChannelModal;
