import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ITEMS, USERS } from '../constants';
import TestModal from './TestModal';

//Lib Items
import { db } from '../lib/firebase';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';
import calculateEstimate from '../lib/estimates';
//Image
import trash from '../image/trash-icon.svg';
//Css Styles
import '../CSS/ListItem.css';
import '../CSS/TestModal.css';

const ListItem = ({ item, onDelete, token }) => {
  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isPurchased, setPurchased] = useState(false);
  let numberOfPurchases = item.number_purchases || 0;
  let hoursDiff = getDifferenceInHours(item.last_purchased);
  let daysDiff = getDifferenceInDays(item.last_purchased);

  let [className, purchaseNext] =
    daysDiff > 2 * item.next_purchase
      ? ['inactive', 'inactive']
      : item.next_purchase < 8
      ? ['soon', 'soon']
      : item.next_purchase < 15
      ? ['kind-of-soon', 'kind of soon']
      : ['not-soon', 'not soon'];

  if (hoursDiff < 24 && isPurchased === false) {
    setPurchased(true);
  }

  function onHandle(event) {
    event.preventDefault();
    numberOfPurchases++;

    let estimate = calculateEstimate(
      item.next_purchase,
      daysDiff,
      numberOfPurchases,
    );
    estimate = Math.round(estimate);
    saveLastPurchasedDate(estimate);
    setPurchased(true);
  }

  function saveLastPurchasedDate(estimate) {
    db.collection(`${USERS}/${token}/${ITEMS}`)
      .doc(item.id)
      .set(
        {
          next_purchase: estimate,
          last_purchased: new Date().toISOString(),
          number_purchases: numberOfPurchases,
        },
        { merge: true },
      );
  }

  return (
    <>
      <li className={className}>
        <span className="label" aria-hidden="true">
          {purchaseNext}
        </span>
        {item.name}
        <span className="screen-reader-only">
          Next purchase in {item.next_purchase} days.
        </span>
        <button
          className={isPurchased ? 'purchased' : 'not-purchased'}
          onClick={onHandle}
          disabled={isPurchased ? !null : null}
        >
          Purchase
          <span className="screen-reader-only">{item.name}.</span>
        </button>
        <button onClick={onDelete}>
          <img className="trash" src={trash} alt="delete item" />
        </button>
        <button onClick={handleShow}>View Details</button>
      </li>
      <TestModal show={show} handleClose={handleClose} />
    </>
  );
};

export default ListItem;
