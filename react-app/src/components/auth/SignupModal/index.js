import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import SignUpForm from './SignUpForm';

import './index.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <div>
      <button className='signupModalButton' onClick={() => setShowModal(true)}>Signup</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

          <SignUpForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
