import { useState } from 'react';
import { USER_TOKEN } from '../constants';
import getToken from '../tokenScript';

export function useToken() {
  const [userToken, setToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );

  const newToken = getToken();
  const setNewToken = () => setToken(newToken);
  const createNewToken = () => setAndSaveNewToken(newToken, setNewToken);

  return [userToken, createNewToken];
}

function setAndSaveNewToken(token, setNewToken) {
  setNewToken();
  localStorage.setItem(USER_TOKEN, token);
}
