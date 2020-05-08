import React, { useState } from 'react';

const Filter = props => {
  const [word, setWord] = useState('');
  const [filterDisplay, setFilterDisplay] = useState(props.items);

  const handleTextChange = event => {
    //console.log(props.item);
    let oldList = props.items.map(item => {
      return {
        item: item.name.toLowerCase(),
      };
    });
    if (event !== '') {
      let newList = [];
      setWord(event);
      newList = oldList.filter(item => item.name.includes(word.toLowerCase()));
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(props.item);
    }
  };

  return (
    <div>
      <input
        onChange={event => handleTextChange(event.target.value)}
        type="text"
        placeholder="Search"
      />
      {filterDisplay.map((item, i) => (
        <div>
          <li>{item.name}</li>
        </div>
      ))}
    </div>
  );
};

export default Filter;
