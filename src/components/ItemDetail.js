import React from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreDocument } from 'react-firestore';
import { ITEMS, USERS } from '../constants';

const ItemDetail = ({ userToken }) => {
  let { itemId } = useParams();
  return (
    <FirestoreDocument
      path={`${USERS}/${userToken}/${ITEMS}/${itemId}`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <h2>... loading ...</h2>
        ) : (
          <div>
            <h1>Item Details</h1>
            <h2>Name: {data.name}</h2>
            <h2>Last Purchased: {data.last_purchased}</h2>
            <h2>Next Purchase: {data.next_purchase} days</h2>
            <h2>Number of Purchases: {data.number_purchases}</h2>
          </div>
        );
      }}
    />
  );
};

export default ItemDetail;
