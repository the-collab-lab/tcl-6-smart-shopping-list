import React from 'react';

const Filter = ({ searchTerm, onChange, clear }) => {
  return (
    <div id="search">
      <label className="screen-reader-only" htmlFor="search">
        Search List
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search List"
        value={searchTerm}
        onChange={onChange}
      />
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default Filter;
