import { fakeCurrentTime } from '../timeConstants';
export function getDifferenceInHours(last_purchased) {
  let nowTimeStamp = new Date(fakeCurrentTime).getTime();
  let lastPurchaseTimeStamp = new Date(last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
  return hoursDiff;
}
