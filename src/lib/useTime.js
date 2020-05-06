import { useState } from 'react';
import { getDifferenceInHours, getDifferenceInDays } from '../lib/timeUtils';
import calculateEstimate from '../lib/estimates';

export function useTime(timeStamp, nextPurchase, numberOfPurchases) {
  const [hoursDiff] = useState(() => getDifferenceInHours(timeStamp));
  const [daysDiff] = useState(() => getDifferenceInDays(timeStamp));
  const [estimatedNextPurchase] = useState(() =>
    calculateEstimate(nextPurchase, daysDiff, numberOfPurchases),
  );
  return [hoursDiff, daysDiff, estimatedNextPurchase];
}
