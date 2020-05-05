import React, { useState } from 'react';
import { ITEMS, USERS } from '../constants';
import { db } from '../lib/firebase';
import {
  getDifferenceInHours,
  getDifferenceInDays,
} from '../lib/getDifferenceInHours';
import calculateEstimate from '../lib/estimates';
import '../CSS/ListItem.css';

const ListItem = props => {
  let hoursDiff = getDifferenceInHours(props.item.last_purchased);
  let daysDiff;
  const [isPurchased, setPurchased] = useState(false);

  if (hoursDiff < 24 && isPurchased === false) {
    setPurchased(true);
  }

  function onHandle(event) {
    event.preventDefault();

    if (props.item.last_purchased === 0) {
      let currentDate = new Date().toISOString();
      daysDiff = getDifferenceInDays(currentDate);
    } else {
      daysDiff = getDifferenceInDays(props.item.last_purchased);
    }

    //let daysDiff = getDifferenceInDays(props.item.last_purchased);
    console.log(daysDiff);
    let newEstimate = calculateEstimate(
      props.item.next_purchase,
      daysDiff,
      props.item.number_purchases,
    );

    setPurchased(true);
    saveLastPurchasedDate(newEstimate);
  }

  function saveLastPurchasedDate(newEstimate) {
    db.collection(`${USERS}/${props.token}/${ITEMS}`)
      .doc(props.item.id)
      .set(
        {
          next_purchase: newEstimate,
          last_purchased: new Date().toISOString(),
          number_purchases: props.item.number_purchases + 1,
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
