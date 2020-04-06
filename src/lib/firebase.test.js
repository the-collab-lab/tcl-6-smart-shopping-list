import { db } from './firebase';

describe('firebase reads and writes', () => {
  it('writes to database', () => {
    let items = db
      .collection('items')
      .doc('Egg Doc ID')
      .set({
        name: 'Milk',
        category: 'Dairy',
      })
      .then(function() {
        console.log('Document has successfully been written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });

    return items;
  });
  //expect(createItem()).toHaveBeenCalledTimes(1)
});
