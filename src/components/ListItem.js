import React, { useState } from 'react';
import { ITEMS } from '../constants';
import { db } from '../lib/firebase';
import '../CSS/ListItem.css';

// THESE ARE FOR PR REVIEW TESTING ONLY
let fakeTimeMonth = `05`;
let fakeTimeDay = `01`;
let fakeTimeHour = `19`;
let fakeTimeMinute = `54`;
let fakeTimeSeconds = `14.`;
let fakeCurrentTime = `2020-${fakeTimeMonth}-${fakeTimeDay}T${fakeTimeHour}:${fakeTimeMinute}:${fakeTimeSeconds}Z`;

const ListItem = props => {
  let nowTimeStamp = new Date(fakeCurrentTime).getTime();

  let lastPurchaseTimeStamp = new Date(props.item.last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
  console.log(props.item.name, 'hoursDiff', isNaN(hoursDiff));
  const [isPurchased, setPurchased] = useState(false);

  if (!isNaN(hoursDiff) && hoursDiff >= 24 && isPurchased !== true) {
    setPurchased(!isPurchased);
  }

  function onHandle(event) {
    event.preventDefault();
    setPurchased(!isPurchased);
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
