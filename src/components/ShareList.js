import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { USER_TOKEN } from '../constants';

const ShareList = () => {
  const [userToken, setUserToken] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    verifySharedToken();
  };

  const verifySharedToken = () => {
    // Create a reference to the items collection
    let itemsRef = db.collection('items');

    // Create a query against the collection.
    let query = itemsRef.where(USER_TOKEN, '==', userToken);
    query.get().then(function(querySnapshot) {
      if (querySnapshot.docs.length === 0) {
        console.log('Invalid token. Please try again or create a new token.');
      } else {
        console.log(userToken);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="sharedToken">
        Share List:
        <input
          type="text"
          name="sharedToken"
          id="sharedToken"
          onChange={event => setUserToken(event.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ShareList;
