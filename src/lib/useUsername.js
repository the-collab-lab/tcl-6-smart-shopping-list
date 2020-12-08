import { USERNAME } from '../constants';
import { useState } from 'react';

export function useUsername() {
  const [username, setUsername] = useState(() =>
    localStorage.getItem(USERNAME),
  );
}
