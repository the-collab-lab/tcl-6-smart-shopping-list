import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ItemDetail = ({ list }) => {
  let { itemId } = useParams();
  let item = list.find(item => item.id === itemId);
  return item ? (
    <main>
      <Link to={'/'}>Back to Shopping</Link>

      <h1>Item Details</h1>
      <h2>Name: {item.name}</h2>
      <h2>Last Purchased: {item.last_purchased}</h2>
      <h2>Next Purchase: {item.next_purchase} days</h2>
      <h2>Number of Purchases: {item.number_purchases}</h2>
    </main>
  ) : (
    <>
      <h2> . . . loading . . .</h2>
    </>
  );
};

export default ItemDetail;
