export function getDifferenceInHours(last_purchased) {
  let nowTimeStamp = new Date().getTime();
  let lastPurchaseTimeStamp = new Date(last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
  return hoursDiff;
}

export function getDifferenceInDays(last_purchased) {
  if (last_purchased === '') return 0;
  let nowTimeStamp = new Date().getTime();
  let lastPurchaseTimeStamp = new Date(last_purchased).getTime();

  let microSecondsDiff = Math.abs(lastPurchaseTimeStamp - nowTimeStamp);
  let daysDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}
