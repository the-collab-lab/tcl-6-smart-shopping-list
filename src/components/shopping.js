import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from './Header';
import ListItem from './ListItem';
import Nav from './Nav';
import Filter from './Filter';
import { sortList } from '../lib/sortUtils';

function Shopping(props) {
  const [list, setList] = useState(props.list);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setList(props.list);
  }, [props.list]);

  const handleTextChange = event => {
    filterList(event.target.value);
  };

  const filterList = searchString => {
    setFilterString(searchString);

    const newList = props.list.filter(item =>
      item.name.toLowerCase().includes(searchString.toLowerCase()),
    );

    setList(newList);
  };

  let sortedList = sortList(list);

  const handleClear = () => {
    setFilterString('');
    props.list.length > 0 && setList(props.list);
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
