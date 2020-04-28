import React from 'react';
import { db } from './firebase';
import { FirestoreCollection, withFirestore } from 'react-firestore';

function TestList(props) {
  let collectionPath = `users/${props.userToken}/shopping_list`;

  function handleClick(id) {
    db.collection(collectionPath)
      .doc(id)
      .delete();
  }
  return (
    <FirestoreCollection
      path="items"
      sort="name:desc"
      // filter={['name', '==', 'Peanut Butter']}
      render={({ data }) => {
        return (
          <div>
            <h1>Test Items</h1>
            <ul>
              {data.map(item => (
                <li key={item.id} onClick={() => handleClick(item.id)}>
                  {item.name} :: last purchase: {item.last_purchase} :: next
                  purchase: {item.next_purchase}
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

export default withFirestore(TestList);
