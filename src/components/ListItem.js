import React, { useState } from 'react';
import { ITEMS, USERS } from '../constants';
import { db } from '../lib/firebase';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';
import calculateEstimate from '../lib/estimates';
//Image
import trash from '../image/Trash.png';
//Css Styles
import '../CSS/ListItem.css';
import '../CSS/DeleteItem.css';

const ListItem = ({ item, token }) => {
  const [isPurchased, setPurchased] = useState(false);
  let numberOfPurchases = item.number_purchases || 0;
  let hoursDiff = getDifferenceInHours(item.last_purchased);

  if (hoursDiff < 24 && isPurchased === false) {
    setPurchased(true);
  }

  function onHandle(event) {
    event.preventDefault();
    numberOfPurchases++;
    let daysDiff = getDifferenceInDays(item.last_purchased);

    let estimate = calculateEstimate(
      item.next_purchase,
      daysDiff,
      numberOfPurchases,
    );
    estimate = parseFloat(estimate.toFixed(2));
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

  function handleClick(event) {
    console.log('clicked');
    console.log(item.id);

    // error message "TypeError: event.preventDefault is not a function

    event.preventDefault();
    handleClick(item.id);
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
      <button onClick={handleClick}>
        <img className="trash" src={trash} alt="delete item" />
      </button>
    </li>
  );
};

export default ListItem;
