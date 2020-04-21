import React from 'react';
import { FirestoreCollection } from 'react-firestore';

function FormAlert() {
  return (
    <FirestoreCollection
      path="items"
      sort="name"
      filter={['name', '==', 'Need user input here']}
      render={({ data }) => {
        console.log(data);
        return (
          <div>
            <h1>Alert :Get it together</h1>
          </div>
        );
      }}
    />
  );
}

export default FormAlert;
