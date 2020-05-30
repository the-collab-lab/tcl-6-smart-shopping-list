import React from 'react';

const Filter = ({ value, onChange, clear }) => {
  return (
    <div id="search">
      <label className="screen-reader-only" htmlFor="search">
        Search List
      </label>
      <input
        id="search"
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
