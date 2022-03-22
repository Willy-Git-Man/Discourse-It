import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import CreatePostForm from './createPost';

import '../index.css'


function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className={'createPostModal'} onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <CreatePostForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
