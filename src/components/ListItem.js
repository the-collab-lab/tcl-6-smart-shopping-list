import React, { useState } from 'react';
import '../CSS/ListItem.css';

const ListItem = item => {
  const [isPurchased, setPurchased] = useState(false);

  let buttonClass = isPurchased ? 'purchased' : 'not-purchased';

  function onHandle(event) {
    setPurchased(!isPurchased);
    onPurchase();
    event.preventDefault();
  }

  function onPurchase() {
    setTimeout(() => {
      setPurchased(false);
    }, 4000);
    console.log(setTimeout);
  }

  return (
    <li>
      {item.name} / {item.next_purchase}
      <button className={buttonClass} onClick={onHandle}>
        Purchase
      </button>
    </li>
  );
};

export default ListItem;
