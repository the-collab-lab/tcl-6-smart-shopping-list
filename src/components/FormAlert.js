import React from 'react';
import { FirestoreCollection } from 'react-firestore';

function FormAlert(props) {
  return (
    <FirestoreCollection
      path="items"
      filter={['name', '==', props.userSubmit]}
      render={({ data }) => {
        console.log(data);
        console.log(data.length);

        if (data.length > 0) {
          return <h1>Alert :Get it together</h1>;
        } else {
          return <div></div>; //Is there a better way to have an empty return
        }
      }}
    />
  );
}

export default FormAlert;
