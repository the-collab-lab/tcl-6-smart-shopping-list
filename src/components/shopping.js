import React, { useState } from 'react';
import { USER_TOKEN } from '../../src/constants';
import getToken from '../../src/tokenScript';
import TestList from '../lib/testList';
import '../App.css';

function Shopping() {
  const [user_token, refreshToken] = useState(localStorage.getItem(USER_TOKEN));
  function handleClick() {
    localStorage.setItem(USER_TOKEN, getToken());
    refreshToken(localStorage.getItem(USER_TOKEN));
  }
  if (user_token) {
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
