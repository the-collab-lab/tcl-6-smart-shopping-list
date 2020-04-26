import React, { Fragment } from 'react';
import '../App.css';

function Shopping(props) {
  return (
    <Fragment>
      <h1>Shopping List</h1>
      <ul>
        {props.list.map(item => (
          <li key={item.name_normalized}>{item.name}</li>
        ))}
      </ul>
    </Fragment>
  );
}

export default Shopping;
