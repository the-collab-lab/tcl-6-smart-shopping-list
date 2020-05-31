import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { USERS, USER_TOKEN } from '../constants';

const ShareList = props => {
  const [isError, toggleError] = useState(false);
  const [tokenToCheck, setUserToken] = useState();

  const handleSubmit = event => {
    event.preventDefault();
    if (tokenToCheck === undefined || tokenToCheck === '') {
      toggleError(true);
      return;
    }

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
          <span className="screen-reader-only">Token</span>
          <input
            type="text"
            name="sharedToken"
            id="sharedToken"
            placeholder="Enter a token"
            onChange={event => setUserToken(event.target.value)}
          />
        </label>
        <input type="submit" value="Join List" />
      </form>
      <div>
        {isError ? (
          <>
            <p className="error">We couldn't find that shopping list.</p>
            <p className="error">Please try again or create a new list.</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ShareList;
