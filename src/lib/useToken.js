import { useState } from 'react';
import { USER_TOKEN } from '../../src/constants';
import getToken from '../tokenScript';

export function useToken() {
  const [userToken, setToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );

  const createToken = () => {
    const token = getToken();
    localStorage.setItem(USER_TOKEN, token);
    setToken(token);
  };

  return [userToken, createToken];
}
