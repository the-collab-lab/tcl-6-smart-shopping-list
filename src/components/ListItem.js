import React, { useState } from 'react';
import { ITEMS } from '../constants';
import { db } from '../lib/firebase';
import '../CSS/ListItem.css';

// THESE ARE FOR PR REVIEW TESTING ONLY
let fakeTimeMonth = `04`;
let fakeTimeDay = `30`;
let fakeTimeHour = `22`;
let fakeTimeMinute = `09`;
let fakeTimeSeconds = `13.814`;
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
        className={isPurchased ? 'not-purchased' : 'purchased'}
        onClick={onHandle}
        disabled={isPurchased ? null : !null}
      >
        Purchase
      </button>
    </li>
  );
};

export default ListItem;
