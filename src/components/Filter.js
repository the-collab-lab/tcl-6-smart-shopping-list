import React from 'react';

const Filter = ({ value, onChange, clear }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
      <button onClick={clear}>CLEAR</button>
    </div>
  );
};

export default Filter;
