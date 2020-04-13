import React, { useState } from 'react';
import getToken from '../../src/tokenScript';
import TestList from '../lib/testList';
import '../App.css';

function Shopping() {
  const [user_token, refreshToken] = useState(
    localStorage.getItem('user_token'),
  );
  function handleClick() {
    localStorage.setItem('user_token', getToken());
    refreshToken(localStorage.getItem('user_token'));
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
