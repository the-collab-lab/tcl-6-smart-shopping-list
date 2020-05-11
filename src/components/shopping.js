import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';

function Shopping(props) {
  // TODO: sort items by estimated next purchase.
  return props.list.length > 0 ? (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {props.list.map(item => (
          <ListItem key={item.id} item={item} token={props.userToken} />
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
