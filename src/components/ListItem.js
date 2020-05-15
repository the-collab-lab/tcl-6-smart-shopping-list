import React, { useState } from 'react';
import { ITEMS, USERS } from '../constants';
import { db } from '../lib/firebase';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';
import calculateEstimate from '../lib/estimates';

import '../CSS/ListItem.css';

const ListItem = ({ item, token }) => {
  const [isPurchased, setPurchased] = useState(false);
  let numberOfPurchases = item.number_purchases || 0;
  let hoursDiff = getDifferenceInHours(item.last_purchased);
  let daysDiff = getDifferenceInDays(item.last_purchased);

  let className =
    daysDiff > 2 * item.next_purchase
      ? 'inactive'
      : item.next_purchase < 8
      ? 'soon'
      : item.next_purchase < 15
      ? 'kind-of-soon'
      : 'not-soon';

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
    <li className={className}>
      {item.name}{' '}
      <span className="screen-reader-only">
        Next Purchase In {item.next_purchase} Days
      </span>
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
