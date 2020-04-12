import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavButton from './components/navbutton.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <NavButton path="/" text="Shopping" />
        <NavButton path="/add" text="Add Item" />
      </div>
    </Router>
  );
}

export default App;
