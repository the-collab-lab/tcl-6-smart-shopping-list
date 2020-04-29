import React, { useState } from 'react';
import { ITEMS } from '../constants';
import { db } from '../lib/firebase';
import '../CSS/ListItem.css';

const ListItem = props => {
  //let testNow = "2020-04-30T19:00:00Z";
  let lastPurchaseTimeStamp = new Date(props.item.last_purchased);
  let now = new Date();
  let nowTimeStamp = now.getTime();
  var microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  var daysDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));

  const [isPurchased, setPurchased] = useState(false);

  if (daysDiff >= 24 && isPurchased !== true) {
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
