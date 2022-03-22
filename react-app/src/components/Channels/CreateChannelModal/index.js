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


  if (+ID === sessionUser.id)
  return (
    <>



      <button className={'createChannelButton'} onClick={() => setShowModal(true)}>Create Channel</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>



          <PostChannelForm setShowModal={setShowModal} />

        </Modal>
      )}


    </>

);
else return null
}

export default CreateChannelModal;
