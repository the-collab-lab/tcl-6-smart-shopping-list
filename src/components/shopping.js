import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import { db } from '../lib/firebase';
// Constants
import { ITEMS, USERS } from '../constants';

function Shopping(props) {
  function handleClick({ id, token }) {
    if (window.confirm('Are you sure you want to delete?')) {
      db.collection(`${USERS}/${token}/${ITEMS}`)
        .doc(id)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    } else {
      console.log('you hit cancel.');
    }
  }

  return props.list.length > 0 ? (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {props.list.map(item => (
          <ListItem
            key={item.id}
            item={item}
            token={props.userToken}
            onDelete={() =>
              handleClick({ id: item.id, token: props.userToken })
            }
          />
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <h1>Shopping List</h1>
      <p>Your list is empty!</p>
      <Link to="/add">Add Your First Item</Link>
    </div>
  );
}

export default Shopping;
