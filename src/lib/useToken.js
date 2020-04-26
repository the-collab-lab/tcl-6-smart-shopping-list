import { useState } from 'react';
import { USER_TOKEN } from '../../src/constants';
import getToken from '../tokenScript';
import registerNewToken from './registerNewToken';

export function useToken() {
  const [userToken, setToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );

  const createToken = () => {
    const token = getToken();
    localStorage.setItem(USER_TOKEN, token);
    setToken(token);
    registerNewToken(token);
  };

  return [userToken, createToken, setToken];
}
