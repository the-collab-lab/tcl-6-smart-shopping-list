import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { USERS, USER_TOKEN } from '../constants';

const ShareList = props => {
  const [isError, toggleError] = useState(false);
  const [tokenToCheck, setUserToken] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    toggleError(false);
    verifySharedToken(tokenToCheck);
  };

  const verifySharedToken = token => {
    db.collection(USERS)
      .doc(token)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          setTokenInAppStateAndStorage(token);
        } else {
          toggleError(true);
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
          Join a list:
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
          <p>
            'We couldn't find that shopping list. Please try again or create a
            new list.'
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ShareList;
