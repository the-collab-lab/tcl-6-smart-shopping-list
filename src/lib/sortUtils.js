import { getDifferenceInDays } from '../lib/timeUtils';

export function sortAlphabetically(list) {
  list.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
}

export function sortByNextPurchase(list) {
  list.sort(function(a, b) {
    return a.next_purchase - b.next_purchase;
  });
}

export function sortInactive(list) {
  let activeItemsList = list.filter(
    item => getDifferenceInDays(item.last_purchased) < 2 * item.next_purchase,
  );

  let sortedList = [...activeItemsList];

  let inactiveItemsList = list.filter(
    item => getDifferenceInDays(item.last_purchased) > 2 * item.next_purchase,
  );

  sortedList.push(inactiveItemsList);

  return sortedList.flat();
}
