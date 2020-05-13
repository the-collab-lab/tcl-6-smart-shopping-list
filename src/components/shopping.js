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

  useEffect(() => {
    setFilteredList(props.list);
  }, [props.list]);

  sortAlphabetically(filteredList);
  sortByNextPurchase(filteredList);
  let sortedList = sortInactive(filteredList);
  console.log(sortedList);

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

  return sortedList.length > 0 ? (
    <div>
      <h1>Shopping List</h1>
      <Filter
        value={filterString}
        onChange={event => handleTextChange(event)}
        clear={() => handleClear()}
      />
      <ul>
        {sortedList.map(item => (
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
