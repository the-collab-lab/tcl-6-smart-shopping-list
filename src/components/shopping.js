import React from 'react';
import { ITEMS } from '../constants';
import { db } from '../lib/firebase';

function Shopping(props) {
  function handleClick(id) {
    db.collection(ITEMS)
      .doc(id)
      .delete()
      .then(function() {
        console.log('Document successfully deleted!');
      })
      .catch(function(error) {
        console.error('Error removing document: ', error);
      });
  }

  if (props.list.length > 0) {
    return (
      <div>
        <h1>Shopping List</h1>
        <h2>***Click item to delete from cart***</h2>

        <ul>
          {props.list.map(item => (
            <li
              key={item.id}
              onClick={() => {
                return handleClick(item.id);
              }}
            >
              {item.name} / {item.next_purchase}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1> Shopping List</h1>
        <p>Theres nothing in your cart, please buy our stuff.</p>
      </div>
    );
  }
}

export default Shopping;
