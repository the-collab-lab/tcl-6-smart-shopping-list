import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import Filter from './Filter';
import {
  sortAlphabetically,
  sortByNextPurchase,
  sortInactive,
} from '../lib/sortUtils';

function Shopping(props) {
  const [filterString, setFilterString] = useState('');
  const [filteredList, setFilteredList] = useState(props.list);

  sortAlphabetically(props.list);
  sortByNextPurchase(props.list);
  let sortedList = sortInactive(props.list);

  useEffect(() => {
    setFilteredList(props.list);
  }, [props.list]);

  const handleTextChange = event => {
    setFilterString(event.target.value);
    const newList = sortedList.filter(item =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setFilteredList(newList);
  };

  const handleClear = () => {
    setFilterString('');
    sortedList.length > 0 && setFilteredList(sortedList);
  };

  return sortedList.length > 0 ? (
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
