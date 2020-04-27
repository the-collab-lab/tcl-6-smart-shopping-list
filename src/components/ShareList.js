import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { ITEMS, USER_TOKEN } from '../constants';

const ShareList = props => {
  const [isError, toggleError] = useState(false);
  const [tokenToCheck, setUserToken] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    toggleError(false);
    verifySharedToken(tokenToCheck);
  };

  const verifySharedToken = token => {
    db.collection(ITEMS)
      .where(USER_TOKEN, '==', token)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.docs.length === 0) {
          toggleError(true);
        } else {
          setTokenInAppStateAndStorage(token);
        }
      });
  };

  const setTokenInAppStateAndStorage = token => {
    props.setToken(token);
    localStorage.setItem(USER_TOKEN, token);
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
