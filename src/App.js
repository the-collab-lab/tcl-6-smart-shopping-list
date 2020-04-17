import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavButton from './components/navbutton.js';
import Shopping from './components/shopping.js';
import AddItem from './components/addItem.js';
import AddItemForm from './components/AddItemForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Shopping} />
        <Route path="/add" component={AddItem} />
        <Route exact path="/add/form" component={AddItemForm} />
        <nav>
          <NavButton path="/" text="Shopping" />
          <NavButton path="/add/form" text="Add Item" />
        </nav>
      </div>
    </Router>
  );
}

export default App;
