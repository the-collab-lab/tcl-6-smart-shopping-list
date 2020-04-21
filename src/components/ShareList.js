import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { USER_TOKEN } from '../constants';
import { useSharedToken } from '../lib/useSharedToken';

const ShareList = () => {
  const [isError, toggleError] = useState(false);
  const [tokenToCheck, setUserToken] = useState();
  const [sharedToken, saveSharedToken] = useSharedToken(tokenToCheck);
  const handleSubmit = event => {
    event.preventDefault();
    verifySharedToken();
    console.log(event.target.value);
  };
  const verifySharedToken = () => {
    // Create a reference to the items collection
    let itemsRef = db.collection('items');
    // Create a query against the collection.
    let query = itemsRef.where(USER_TOKEN, '==', tokenToCheck);
    query.get().then(function(querySnapshot) {
      if (querySnapshot.docs.length === 0) {
        toggleError(true);
      } else {
        saveSharedToken(tokenToCheck);
      }
    });
  };

  return (
    <div>
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
      <div>
        {isError ? (
          <p>'Invalid token. Please try again or create a new token.'</p>
        ) : null}
      </div>
    </div>
  );
};

export default ShareList;
