import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import CreatePostForm from '../createPost';


function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className={'loginModalButton'} onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <CreatePostForm />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
