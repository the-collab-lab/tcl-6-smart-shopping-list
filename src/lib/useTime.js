import { useState } from 'react';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';

export function useTime(timeStamp) {
  const [hoursDiff] = useState(() => getDifferenceInHours(timeStamp));
  const [daysDiff] = useState(() => getDifferenceInDays(timeStamp));
  return [hoursDiff, daysDiff];
}
