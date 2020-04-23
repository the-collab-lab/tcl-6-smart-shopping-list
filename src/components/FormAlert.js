import React from 'react';
import { FirestoreCollection } from 'react-firestore';

function normalizeItem(item) {
  var pattern = /\d[.,\/#!$%\^&\*;:{}=\-_`~()]\ix/;
  // remove capitilization
  item.replace(pattern, '');
  return;
  // remove numbers and special characters
  // spaces
  //return item normalized
}

///// MOVED TO AddItemForm.js
function FormAlert(props) {
  console.log(normalizeItem(props.userSubmit));
  return (
    <FirestoreCollection
      path="items"
      filter={['name', '==', props.userSubmit]}
      render={({ data }) => {
        if (data.length > 0) {
          return (
            <p>This item has already been added to your shopping list.</p> // if we can add the actual item name {data.name}
          );
        } else {
          return <div></div>; //Is there a better way to have an empty return
        }
      }}
    />
  );
}

export default FormAlert;
