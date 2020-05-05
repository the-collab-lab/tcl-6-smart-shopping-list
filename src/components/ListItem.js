import React, { useState } from 'react';
import { ITEMS, USERS } from '../constants';
import { db } from '../lib/firebase';
import { getDifferenceInHours } from '../lib/getDifferenceInHours';
import '../CSS/ListItem.css';

const ListItem = props => {
  let hoursDiff = getDifferenceInHours(props.item.last_purchased);
  const [isPurchased, setPurchased] = useState(false);

  if (hoursDiff < 24 && isPurchased === false) {
    setPurchased(true);
  }

  function onHandle(event) {
    event.preventDefault();
    setPurchased(true);
    saveLastPurchasedDate();
  }

  function saveLastPurchasedDate() {
    db.collection(`${USERS}/${props.token}/${ITEMS}`)
      .doc(props.item.id)
      .set(
        {
          last_purchased: new Date().toISOString(),
        },
        { merge: true },
      );
  }
  return (
    <li>
      {props.item.name} : {props.item.next_purchase} :
      {props.item.last_purchased}
      <button
        className={isPurchased ? 'purchased' : 'not-purchased'}
        onClick={onHandle}
        disabled={isPurchased ? !null : null}
      >
        Purchase
      </button>
    </li>
  );
};

export default ListItem;
