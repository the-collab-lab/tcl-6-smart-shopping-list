import React from 'react';

const ListItem = item => {
  return (
    <li>
      {item.name} / {item.next_purchase}
      <button>Purchased</button>
    </li>
  );
};

export default ListItem;
