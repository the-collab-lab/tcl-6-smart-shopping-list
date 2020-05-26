import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ITEMS, USERS } from '../constants';

//Lib Items
import { db } from '../lib/firebase';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';
import calculateEstimate from '../lib/estimates';
//Image
import trash from '../image/trash-icon.svg';
import lemon from '../image/lemon-regular.svg';
import lemonSolid from '../image/lemon-solid.svg';
import rightChevron from '../image/angle-right-solid.svg';
//Css Styles
import '../CSS/ListItem.css';
import '../CSS/Icon.css';

const ListItem = ({ item, onDelete, token }) => {
  const [isPurchased, setPurchased] = useState(false);
  let numberOfPurchases = item.number_purchases || 0;
  let hoursDiff = getDifferenceInHours(item.last_purchased);
  let daysDiff = getDifferenceInDays(item.last_purchased);

  let [className, purchaseNext] =
    daysDiff > 2 * item.next_purchase
      ? ['inactive', 'inactive']
      : item.next_purchase < 8
      ? ['soon', 'soon']
      : item.next_purchase < 15
      ? ['kind-of-soon', 'kind of soon']
      : ['not-soon', 'not soon'];

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
      <button
        // className={isPurchased ? 'purchased' : 'not-purchased'}
        onClick={onHandle}
        disabled={isPurchased ? !null : null}
      >
        {isPurchased ? (
          <img className="lemon" src={lemonSolid} alt="purchase item" />
        ) : (
          <img className="lemon" src={lemon} alt="purchase item" />
        )}

        <span className="screen-reader-only">Purchase {item.name}.</span>
      </button>

      <span className="item-name">{item.name}</span>

      <span className="screen-reader-only">
        Next purchase in {item.next_purchase} days.
      </span>

      <button onClick={onDelete}>
        <img className="trash" src={trash} alt="delete item" />
      </button>

      <Link to={`detail/${item.name_normalized}`}>
        {' '}
        <img className="chevron" src={rightChevron} alt="View item details" />
      </Link>
    </li>
  );
};

export default ListItem;
