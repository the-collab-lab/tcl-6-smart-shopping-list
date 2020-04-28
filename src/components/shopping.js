import React from 'react';
import '../App.css';

function Shopping(props) {
  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {props.list.map(item => (
          <li key={item.id}>
            {item.name} / {item.next_purchase}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Shopping;
