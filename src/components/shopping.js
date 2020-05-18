import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import Filter from './Filter';
import { sortAlphabetically, sortByNextPurchase } from '../lib/sortUtils';

function Shopping(props) {
  // TODO: sort items by estimated next purchase.
  sortAlphabetically(props.list);
  sortByNextPurchase(props.list);
  const [filterString, setFilterString] = useState('');
  const [filteredList, setFilteredList] = useState(props.list);

  useEffect(() => {
    setFilteredList(props.list);
  }, [props.list]);

  const handleTextChange = event => {
    setFilterString(event.target.value);
    const newList = props.list.filter(item =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setFilteredList(newList);
  };

  const handleClear = () => {
    setFilterString('');
    props.list.length > 0 && setFilteredList(props.list);
  };

  return props.list.length > 0 ? (
    <div>
      <h1>Shopping List</h1>
      <Filter
        value={filterString}
        onChange={event => handleTextChange(event)}
        clear={() => handleClear()}
      />
      <ul>
        {filteredList.map(item => (
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
