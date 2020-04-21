import { useState } from 'react';
import { USER_TOKEN } from '../../src/constants';

export function useSharedToken(token) {
  const [sharedToken, setSharedToken] = useState(token);

  const setSharedToken = () => {
    localStorage.setItem(USER_TOKEN, sharedToken);
    setSharedToken(sharedToken);
  };

  return [sharedToken, setSharedToken];
}
