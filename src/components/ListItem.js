import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// FontAwesomeIcon component and faAngleRight are courtesy of Font Awesome and licensed under Creative Commons Attribution 4.0 International license: https://fontawesome.com/license.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { ITEMS, USERS } from '../constants';
import DetailModal from './DetailModal';

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
import '../CSS/DetailModal.css';

import DeleteItemModal from './DeleteItemModal';

const ListItem = ({ item, onDelete, token }) => {
  const history = useHistory();

  let [show, setShow] = useState(false);

  const [isPurchased, setPurchased] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  function onPurchase(event) {
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
    <>
      <li>
        <button
          className={`${
            isPurchased ? 'purchased' : 'not-purchased'
          } ${className}`}
          onClick={onPurchase}
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

        <button className="trash" onClick={() => setModalIsOpen(true)}>
          <img
            className="trashIcon"
            src={trash}
            title="Delete item"
            alt="Delete item"
          />
        </button>
        <DeleteItemModal
          show={modalIsOpen}
          onClose={setModalIsOpen}
          token={token}
          item={item}
        />
        <Link to={`${item.id}`}>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="3x"
            className="chevron"
            title={`View ${item.name} Details`}
          />
          <span className="screen-reader-only">View {item.name} Details</span>
        </Link>
        <DetailModal
          item={item}
          show={show}
          handleClose={() => {
            setShow(false);
            history.push('/');
          }}
        />
      </li>
    </>
  );
};

export default ListItem;
