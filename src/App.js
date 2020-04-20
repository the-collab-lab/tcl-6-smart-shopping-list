import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavButton from './components/navbutton';
import Shopping from './components/shopping';
import AddItem from './components/addItem';
import ShareList from './components/ShareList';
import { useToken } from './lib/useToken';
import './App.css';

function App() {
  const [userToken, createToken] = useToken();

  if (userToken) {
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
      <div className="App">
        <button className="button" onClick={createToken}>
          Create New List
        </button>
        <ShareList />
      </div>
    );
  }
}

export default App;
