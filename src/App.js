import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavButton from './components/navbutton.js';
import Shopping from './components/shopping.js';
import AddItem from './components/addItem.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Shopping} />
        <Route path="/add" component={AddItem} />

        <NavButton path="/" text="Shopping" />
        <NavButton path="/add" text="Add Item" />
      </div>
    </Router>
  );
}

export default App;
