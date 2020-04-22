import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { USER_TOKEN } from '../constants';
import { useSharedToken } from '../lib/useSharedToken';

const ShareList = props => {
  const [isError, toggleError] = useState(false);
  const [tokenToCheck, setUserToken] = useState();
  const [sharedToken, saveSharedToken] = useSharedToken(tokenToCheck);

  useEffect(() => {
    props.setToken(tokenToCheck);

    return () => props.setToken(tokenToCheck);
  }, [props, tokenToCheck]);

  const handleSubmit = event => {
    event.preventDefault();
    toggleError(false);
    verifySharedToken();
  };

  const verifySharedToken = () => {
    db.collection('items')
      .where(USER_TOKEN, '==', tokenToCheck)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.docs.length === 0) {
          toggleError(true);
        } else {
          props.setToken(tokenToCheck);
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
