import React from 'react';

const Filter = ({ value, onChange, clear }) => {
  return (
    <div id="search">
      <label className="screen-reader-only">Search List</label>
      <input
        type="text"
        placeholder="Search List"
        value={value}
        onChange={onChange}
      />
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default Filter;
