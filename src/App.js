import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TestList, AddTestItem } from './lib/firebase.test';

function App() {
  return (
    <div className="App">
      <AddTestItem />
      <TestList />
    </div>
  );
}

export default App;
