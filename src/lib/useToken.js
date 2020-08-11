import { useState } from 'react';
import firebase from 'firebase';

import { USER_TOKEN } from '../../src/constants';
import getToken from '../tokenScript';
import registerNewToken from './registerNewToken';

export function useToken() {
  const [userToken, setToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );

  const createToken = () => {
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
    });
    const token = getToken();
    localStorage.setItem(USER_TOKEN, token);
    setToken(token);
    registerNewToken(token);
  };

  return [userToken, createToken, setToken];
}
