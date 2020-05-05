export function getDifferenceInHours(last_purchased) {
  // REMOVE fakeCurrentTime TO GET THE TRUE CURRENT DATE/TIME.
  let nowTimeStamp = new Date().getTime();
  let lastPurchaseTimeStamp = new Date(last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
  return hoursDiff;
}

export function getDifferenceInDays(last_purchased) {
  let nowTimeStamp = new Date().getTime();
  let lastPurchaseTimeStamp = new Date(last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let daysDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}
