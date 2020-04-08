import React from 'react';
import { FirestoreCollection } from 'react-firestore';

function TestList() {
  return (
    <FirestoreCollection
      path="testitems"
      sort="name:desc"
      render={({ data }) => {
        return (
          <div>
            <h1>Test Items</h1>
            <ul>
              {data.map(item => (
                <li key={item.id}>
                  {item.category} - {item.name}
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

export default TestList;

// describe('firebase reads and writes', () => {
//   it('writes to the database', () => {
//     let collectionName = 'testitems';
//     let groceryItem = {
//       name: 'limes',
//       category: 'citrus',
//     };
//     return db
//       .collection(collectionName)
//       .add(groceryItem)
//       .then(function(docRef) {
//         console.log('Document written with ID: ', docRef.id);
//       })
//       .catch(function(error) {
//         console.error('Error adding document: ', error);
//       });
//   });

//   it('read from the database', () => {
//     return db
//       .collection('testitems')
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           console.log(`${doc.id} => ${doc.data().name}`);
//         });
//       });
//   });
// });
