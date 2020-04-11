import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavButton from 'components/navbutton.js';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Link to="/">
          <NavButton className="active">Shopping List</NavButton>
        </Link>
        <Link to="/add">
          <NavButton className="active">Add Item</NavButton>
        </Link>
      </div>
    </Router>
  );
}

export default App;
