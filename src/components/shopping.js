import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import Header from './Header';
import ListItem from './ListItem';
import Nav from './Nav';
import Filter from './Filter';
import {
  sortAlphabetically,
  sortByNextPurchase,
  sortInactive,
} from '../lib/sortUtils';
import { ITEMS, USERS } from '../constants';

function Shopping(props) {
  const [filterString, setFilterString] = useState('');
  const [filteredList, setFilteredList] = useState(props.list);

  useEffect(() => {
    setFilteredList(props.list);
  }, [props.list]);

  sortAlphabetically(filteredList);
  sortByNextPurchase(filteredList);
  let sortedList = sortInactive(filteredList);

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

  function handleClick({ name, id, token }) {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      db.collection(`${USERS}/${token}/${ITEMS}`)
        .doc(id)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    } else {
      console.log(`${name} was not deleted.`);
    }
  }

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
        {sortedList.length === 0 ? <p>No matches found.</p> : null}
        <ul>
          {sortedList.map(item => (
            <ListItem
              key={item.id}
              item={item}
              token={props.userToken}
              onDelete={() =>
                handleClick({
                  name: item.name,
                  id: item.id,
                  token: props.userToken,
                })
              }
            />
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
      <Nav />
    </>
  );
}

export default Shopping;
