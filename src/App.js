import React from 'react';
import './App.css';
import TestList from './lib/testList';
import AddTestItem from './lib/addTestItem';

function App() {
  return (
    <div className="App">
      <AddTestItem />
      <TestList />
    </div>
  );
}

export default App;
