import React from 'react';
import { Link, useParams } from 'react-router-dom';
import arrowLeft from '../image/arrow-left.svg';
import '../CSS/Icon.css';
// Small change
const ItemDetail = ({ list }) => {
  let { itemName } = useParams();
  let item = list.find(item => item.name_normalized === itemName);

  let lastPurchase =
    item && item.last_purchased !== ''
      ? new Date(item.last_purchased).toDateString()
      : '';

  return item ? (
    <main>
      <Link className="to-shopping" to={'/'}>
        <img
          className="arrow-left"
          src={arrowLeft}
          alt="Back to shopping list"
        />{' '}
        <span className="back-text">Back to list</span>
      </Link>

      <h1>Item Details</h1>
      <h2>Name: {item.name}</h2>
      <h2>Number of Purchases: {item.number_purchases}</h2>
      <h2>You might want this in about: {item.next_purchase} days</h2>
      {lastPurchase === '' ? null : <h2>Last Purchased: {lastPurchase}</h2>}
    </main>
  ) : (
    <>
      <h2> . . . loading . . .</h2>
    </>
  );
};

export default ItemDetail;
