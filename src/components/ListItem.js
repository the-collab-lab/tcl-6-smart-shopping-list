import React, { useState } from 'react';
import { ITEMS } from '../constants';
import { db } from '../lib/firebase';
import '../CSS/ListItem.css';

// THESE ARE FOR PR REVIEW TESTING ONLY
let fakeTimeMonth = `05`;
let fakeTimeDay = `01`;
let fakeTimeHour = `20`;
let fakeTimeMinute = `23`;
let fakeTimeSeconds = `39.431`;
let fakeCurrentTime = `2020-${fakeTimeMonth}-${fakeTimeDay}T${fakeTimeHour}:${fakeTimeMinute}:${fakeTimeSeconds}Z`;

const ListItem = props => {
  let nowTimeStamp = new Date().getTime();
  let lastPurchaseTimeStamp = new Date(props.item.last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
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
    db.collection(ITEMS)
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
