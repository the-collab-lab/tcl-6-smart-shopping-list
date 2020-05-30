import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { db } from '../lib/firebase';
import { ITEMS, USERS } from '../constants';

const DeleteItemModal = ({ show, item, token, onClose }) => {
  function handleClick() {
    db.collection(`${USERS}/${token}/${ITEMS}`)
      .doc(item.id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  }

  return (
    <>
      <Modal show={show} animation={false}>
        <Modal.Body>
          <p>Are you sure you want to delete {item.name} ? </p>
        </Modal.Body>
        <Modal.Footer className="delete-buttons">
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button onClick={handleClick}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteItemModal;
