import React, { useState } from 'react';

const Filter = props => {
  function handleTextChange() {
    console.log('Hey you typed something');
  }

  return (
    <input onChange={handleTextChange} type="text" placeholder="Search"></input>
  );
};

export default Filter;
