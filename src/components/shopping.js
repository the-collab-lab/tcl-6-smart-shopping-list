import React from 'react';
import { USER_TOKEN } from '../../src/constants';
import getToken from '../../src/tokenScript';
import TestList from '../lib/testList';
import { useToken } from '../lib/useToken';
import '../App.css';

function Shopping() {
  const [userToken, refreshToken] = useToken();
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
