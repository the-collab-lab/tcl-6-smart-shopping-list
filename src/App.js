import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavButton from './components/navbutton.js';
import Shopping from './components/shopping.js';
import AddItem from './components/addItem.js';
import { useToken } from './lib/useToken';

function App() {
  const [userToken, refreshToken] = useToken();
  console.log(`user token: ${userToken}`);
  if (userToken) {
    refreshToken();
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Shopping} />
          <Route path="/add" component={AddItem} />

          <nav id="nav">
            <NavButton path="/" text="Shopping" />
            <NavButton path="/add" text="Add Item" />
          </nav>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Shopping} />
          <Route path="/add" component={AddItem} />
        </div>
      </Router>
    );
  }
}

export default App;
