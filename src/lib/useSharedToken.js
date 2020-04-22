import { useState } from 'react';
import { USER_TOKEN } from '../../src/constants';

export function useSharedToken(token) {
  const [sharedToken, setSharedToken] = useState(token);

  const saveSharedToken = token => {
    localStorage.setItem(USER_TOKEN, token);
    setSharedToken(token);
  };

  return [sharedToken, saveSharedToken];
}
