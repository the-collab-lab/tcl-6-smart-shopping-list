import React, { useState } from 'react';
import { ITEMS } from '../constants';
import { db } from '../lib/firebase';
import '../CSS/ListItem.css';

const ListItem = props => {
  const [isPurchased, setPurchased] = useState(false);

  let buttonClass = isPurchased ? 'purchased' : 'not-purchased';

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
      <button className={buttonClass} onClick={onHandle}>
        Purchase
      </button>
    </li>
  );
};

export default ListItem;
