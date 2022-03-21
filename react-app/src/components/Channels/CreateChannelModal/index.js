import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/modal';

import PostChannelForm from '../postChannel';

function CreateChannelModal() {
  const [showModal, setShowModal] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const id = useParams();
  const ID = id.userId;

  console.log('ID:', ID)

  if (+ID === sessionUser.id)
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
else return null
}

export default CreateChannelModal;
