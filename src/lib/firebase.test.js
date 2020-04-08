import { db } from './firebase';

describe('firebase reads and writes', () => {
  it('writes to the database', () => {
    let collectionName = 'testitems';
    let groceryItem = {
      name: 'limes',
      category: 'citrus',
    };
    return db
      .collection(collectionName)
      .add(groceryItem)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  });

  it('read from the database', () => {
    return db
      .collection('testitems')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data().name}`);
        });
      });
  });
});
