import { getDifferenceInDays } from '../lib/timeUtils';

function sortAlphabetically(list) {
  return list.sort(function(a, b) {
    var nameA = a.name_normalized.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name_normalized.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // if the names are equal
    return 0;
  });
}

function sortByNextPurchase(list) {
  return list.sort(function(a, b) {
    return a.next_purchase - b.next_purchase;
  });
}

export function sortList(list) {
  let activeItems = list.filter(
    item => getDifferenceInDays(item.last_purchased) < 2 * item.next_purchase,
  );

  let soonItems = activeItems.filter(item => item.next_purchase < 8);
  soonItems = sortAlphabetically(soonItems);
  soonItems = sortByNextPurchase(soonItems);

  let kindOfSoonItems = activeItems.filter(
    item => item.next_purchase > 8 && item.next_purchase < 15,
  );
  kindOfSoonItems = sortAlphabetically(kindOfSoonItems);
  kindOfSoonItems = sortByNextPurchase(kindOfSoonItems);

  let notSoonItems = activeItems.filter(item => item.next_purchase > 15);
  notSoonItems = sortAlphabetically(notSoonItems);
  notSoonItems = sortByNextPurchase(notSoonItems);

  let inactiveItems = list.filter(
    item => getDifferenceInDays(item.last_purchased) > 2 * item.next_purchase,
  );
  inactiveItems = sortAlphabetically(inactiveItems);

  return [...soonItems, ...kindOfSoonItems, ...notSoonItems, ...inactiveItems];
}
