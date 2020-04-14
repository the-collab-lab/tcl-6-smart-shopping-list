import { useState, useEffect } from 'react';
import { USER_TOKEN } from '../../src/constants';

export function useToken() {
  const [userToken, setToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );

  useEffect(() => setToken(userToken), [userToken]);

  return [userToken, setToken];
}
