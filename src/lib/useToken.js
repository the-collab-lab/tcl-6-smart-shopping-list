import { useState, useEffect } from 'react';
import { USER_TOKEN } from '../../src/constants';

export function useToken() {
  const [userToken, refreshToken] = useState(() =>
    localStorage.getItem(USER_TOKEN),
  );

  useEffect(() => refreshToken(userToken), [userToken]);

  return [userToken, refreshToken];
}
