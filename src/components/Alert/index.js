import React from 'react';
import Modal from 'react-modal';

const customStyleModal = {
  content: {
    top: '50%',
    boxShadow: '5px 5px 5px #888888',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'right',
  },
};
const Alert = ({ open, onClick, message }) => (
  <Modal ariaHideApp={false} isOpen={open} style={customStyleModal}>
    <button
      type="button"
      className="button_close"
      onClick={onClick}
    >
      X
    </button>
    <h1>{message}</h1>
  </Modal>
);

export default Alert;
