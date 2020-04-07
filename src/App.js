import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Link to="/">
          <button className="active">Shopping List</button>
        </Link>
        <Link to="/add">
          <button>Add Item</button>
        </Link>
      </div>
    </Router>
  );
}

export default App;
