import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import LoginForm from './LoginForm';
import { useDispatch, useSelector } from "react-redux";



import './index.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  // const sessionUser = useSelector((state) => state.session.user);



  return (
    <>

        <button className={'loginModalButton'} onClick={() => setShowModal(true)}>Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false) }>

        <LoginForm />
        </Modal>
        )}
    </>
  );
}

export default LoginFormModal;
