import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from './Header';
import ListItem from './ListItem';
import Nav from './Nav';
import Filter from './Filter';
import { sortList } from '../lib/sortUtils';

function Shopping(props) {
  const [filterString, setFilterString] = useState('');
  const [filteredList, setFilteredList] = useState(props.list);

  useEffect(() => {
    setFilteredList(props.list);
    filterList(filterString);
  }, [props.list]);

  let sortedList = sortList(filteredList);

  const handleTextChange = event => {
    filterList(event.target.value);
  };

  const filterList = filterString => {
    setFilterString(filterString);

    const newList = props.list.filter(item =>
      item.name.toLowerCase().includes(filterString.toLowerCase()),
    );
    setFilteredList(newList);
  };

  const handleClear = () => {
    setFilterString('');
    props.list.length > 0 && setFilteredList(props.list);
  };

  return props.list.length > 0 ? (
    <>
      <Header />
      <main>
        <h2>Shopping List</h2>
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
      </main>
      <Nav />
    </>
  ) : (
    <>
      <Header />
      <main>
        <h2>Shopping List</h2>
        <p>Your list is empty!</p>
        <Link to="/add">Add Your First Item</Link>
      </main>
    </>
  );
}

export default Shopping;
