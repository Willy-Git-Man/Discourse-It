import React, { useState } from 'react';
import { Modal } from '../../context/modal';

// import './index.css'
import EditPostForm from '../editPost';

function EditPostModal({postId}) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className={'editPostButton'} onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <EditPostForm postId={postId} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
