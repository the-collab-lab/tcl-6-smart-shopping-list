import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TestModal = ({ show, handleClose, item }) => {
  let lastPurchase = item ? new Date(item.last_purchased).toDateString() : '';

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name} details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h2>Last Purchased: {lastPurchase}</h2>
          <h2>Next Purchase: {item.next_purchase} days</h2>
          <h2>Number of Purchases: {item.number_purchases}</h2>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestModal;
