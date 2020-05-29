import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// FontAwesomeIcon component and faAngleRight are courtesy of Font Awesome and licensed under Creative Commons Attribution 4.0 International license: https://fontawesome.com/license.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { ITEMS, USERS } from '../constants';

//Lib Items
import { db } from '../lib/firebase';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';
import calculateEstimate from '../lib/estimates';
//Image
import trash from '../image/trash-icon.svg';
import eggWhole from '../image/egg-whole.svg';
import eggHeartCracked from '../image/egg-heart-cracked.svg';
//Css Styles
import '../CSS/ListItem.css';
import '../CSS/Icon.css';
import '../CSS/colors.css';

const ListItem = ({ item, onDelete, token }) => {
  const [isPurchased, setPurchased] = useState(false);
  let numberOfPurchases = item.number_purchases || 0;
  let hoursDiff = getDifferenceInHours(item.last_purchased);
  let daysDiff = getDifferenceInDays(item.last_purchased);

  let className =
    daysDiff > 2 * item.next_purchase
      ? 'inactive'
      : item.next_purchase > 14
      ? 'not-soon'
      : item.next_purchase > 8
      ? 'kind-of-soon'
      : 'soon';

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
    <li>
      <button
        className={`${
          isPurchased ? 'purchased' : 'not-purchased'
        } ${className}`}
        onClick={onHandle}
        disabled={isPurchased ? !null : null}
      >
        {isPurchased ? (
          <img
            className="egg"
            src={eggHeartCracked}
            title="Item is purchased"
            alt="Item is purchased"
          />
        ) : (
          <img
            className="egg"
            src={eggWhole}
            title="Purchase item"
            alt="Purchase item"
          />
        )}

        <span className="screen-reader-only">Purchase {item.name}.</span>
      </button>

      <span className="item-name">{item.name}</span>

      <span className="screen-reader-only">
        Next purchase in {item.next_purchase} days.
      </span>

      <button className="trash" onClick={onDelete}>
        <img
          className="trashIcon"
          src={trash}
          title="Delete item"
          alt="Delete item"
        />
      </button>

      <Link to={`detail/${item.name_normalized}`}>
        <FontAwesomeIcon
          icon={faAngleRight}
          size="3x"
          className="chevron"
          title="View Details"
        />
        <span className="screen-reader-only">View {item.name} Details</span>
      </Link>
    </li>
  );
};

export default ListItem;
