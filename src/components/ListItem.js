import React, { useState } from 'react';
import { ITEMS, USERS } from '../constants';
import { db } from '../lib/firebase';
import { useTime } from '../lib/useTime';
import calculateEstimate from '../lib/estimates';

import '../CSS/ListItem.css';

const ListItem = props => {
  const { item, token } = props;
  const [isPurchased, setPurchased] = useState(false);
  const [hoursDiff, daysDiff] = useTime(item.last_purchased);

  if (hoursDiff < 24 && isPurchased === false) {
    setPurchased(true);
  }

  function onHandle(event) {
    event.preventDefault();
    let estimate = calculateEstimate(
      item.next_purchase,
      daysDiff,
      item.number_purchases + 1,
    );
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
          number_purchases: item.number_purchases + 1,
        },
        { merge: true },
      );
  }
  return (
    <li>
      {item.name} :: Next Purchase: {item.next_purchase} days :: Last Purchased
      On: {item.last_purchased}
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
