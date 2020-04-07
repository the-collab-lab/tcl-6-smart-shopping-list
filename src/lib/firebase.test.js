import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from './firebase';
import FirestoreMock from './firebase-mock';

describe('firebase reads and writes', () => {
  const firestoreMock = new FirestoreMock();
  beforeEach(() => {
    firebase.firestore = firestoreMock;
    firestoreMock.reset();
  });

  it('does something', done => {
    firestoreMock.mockSetReturn = { id: 'WkSiIbtG5SWOeu30VXz3' };
    firebase.firestore
      .collection('items')
      .doc('WkSiIbtG5SWOeu30VXz3')
      .set({ name: 'apples', category: 'produce' })
      .then(res => {
        expect(firestoreMock.mockCollection).toBeCalledWith('items');
        expect(firestoreMock.mockSet).toBeCalledWith({
          name: 'apples',
          category: 'produce',
        });
        expect(res.id).toEqual('WkSiIbtG5SWOeu30VXz3');
        done();
      })
      .catch(done);
  });

  let promiseVoid = Promise.resolve();
  it('writes to database', () => {
    let items = db
      .collection('items')
      .add({
        name: 'blueberries',
        categorey: 'fruit',
      })
      .then(function() {
        console.log('Document written with ID');
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

    expect(items).toEqual(promiseVoid);
    // return items;
  });

  it('reads from database', () => {
    let items = db
      .collection('items')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`Item: ${doc.id} => ${doc.data().name}`);
        });
      });
    return items;
  });
});
