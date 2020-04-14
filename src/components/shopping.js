import React, { useState } from 'react';
import { USER_TOKEN } from '../../src/constants';
import getToken from '../../src/tokenScript';
import TestList from '../lib/testList';
import '../App.css';

function Shopping() {
  const [userToken, refreshToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );
  function handleClick() {
    const token = getToken();
    localStorage.setItem(USER_TOKEN, token);
    refreshToken(token);
  }
  if (userToken) {
    return <TestList />;
  } else {
    return (
      <button className="button" onClick={handleClick}>
        Create New List
      </button>
    );
  }
}

export default Shopping;
