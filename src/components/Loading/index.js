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
const Loading = ({ open }) => (
  <Modal ariaHideApp={false} isOpen={open} style={customStyleModal}>
    <h1>Loading</h1>
  </Modal>
);

export default Loading;
