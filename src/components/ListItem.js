import React, { useState } from 'react';
import { ITEMS, USER_TOKEN } from '../constants';
import { db } from '../lib/firebase';
import '../CSS/ListItem.css';

const ListItem = props => {
  const [isPurchased, setPurchased] = useState(false);
  const [itemState, setItemState] = useState({ last_purchase: '' });

  let buttonClass = isPurchased ? 'purchased' : 'not-purchased';
  console.log(itemState);

  function onHandle(event) {
    event.preventDefault();

    setPurchased(!isPurchased);
    onPurchase();
  }

  function onPurchase() {
    let { last_purchase, ...restOfItemState } = itemState;
    let lastPurchasedDate = new Date().toISOString();
    setItemState({ ...restOfItemState, last_purchase: lastPurchasedDate });
  }

  function saveLastPurchasedDate() {
    db.collection(ITEMS)
      .where(USER_TOKEN, '==', props.token)
      .set(
        {
          last_purchase: true,
        },
        { merge: true },
      );
  }

  return (
    <li>
      {props.item.name} / {props.item.next_purchase}
      <button className={buttonClass} onClick={onHandle}>
        Purchase
      </button>
    </li>
  );
};

export default ListItem;
