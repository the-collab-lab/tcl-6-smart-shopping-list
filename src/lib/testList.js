import React from 'react';
import { db } from './firebase';
import { FirestoreCollection } from 'react-firestore';

function TestList() {
  function handleClick(id) {
    db.collection('testitems')
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  }

  return (
    <FirestoreCollection
      path="testitems"
      sort="name:desc"
      render={({ data }) => {
        console.log(data);
        return (
          <div>
            <h1>Test Items</h1>
            <ul>
              {data.map(item => (
                <li key={item.id} onClick={() => handleClick(item.id)}>
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
