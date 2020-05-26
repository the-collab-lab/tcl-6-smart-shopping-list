import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import arrowLeft from '../image/arrow-left.svg';
import '../CSS/Icon.css';

const DetailModal = ({ show, handleClose, item }) => {
  let lastPurchase =
    item && item.last_purchased !== ''
      ? new Date(item.last_purchased).toDateString()
      : '';

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="modal-header">
        <Button onClick={handleClose} className="to-shopping">
          <img
            className="arrow-left"
            src={arrowLeft}
            alt="Back to shopping list"
          />{' '}
          <span className="back-text">Back to list</span>
        </Button>
        <Modal.Title>
          <h3>{item.name} details</h3>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h2>Number of Purchases: {item.number_purchases}</h2>
        <h2>Next Purchase: {item.next_purchase} days</h2>
        {lastPurchase === '' ? null : <h2>Last Purchased: {lastPurchase}</h2>}
      </Modal.Body>

      <Modal.Footer className="modal-footer">
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
