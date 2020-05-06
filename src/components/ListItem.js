import React, { useState } from 'react';
import { ITEMS, USERS } from '../constants';
import { db } from '../lib/firebase';
import { useTime } from '../lib/useTime';
import '../CSS/ListItem.css';

const ListItem = props => {
  const { item, token } = props;
  const [isPurchased, setPurchased] = useState(false);
  const [hoursDiff, estimatedNextPurchase] = useTime(
    item.last_purchased,
    item.next_purchase,
    item.number_purchases,
  );

  if (hoursDiff < 24 && isPurchased === false) {
    setPurchased(true);
  }

  function onHandle(event) {
    event.preventDefault();
    saveLastPurchasedDate();
    setPurchased(true);
  }

  function saveLastPurchasedDate() {
    db.collection(`${USERS}/${token}/${ITEMS}`)
      .doc(item.id)
      .set(
        {
          next_purchase: estimatedNextPurchase.toFixed(2),
          last_purchased: new Date().toISOString(),
          number_purchases: item.number_purchases + 1,
        },
        { merge: true },
      );
  }
  return (
    <li>
      {item.name} : {item.next_purchase} :{item.last_purchased}
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
