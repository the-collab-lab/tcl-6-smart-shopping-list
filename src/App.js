import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavButton from './components/navbutton';
import Shopping from './components/shopping';
import AddTestItem from './lib/addTestItem';
import { useToken } from './lib/useToken';
import './App.css';

function App() {
  const [userToken, createNewToken] = useToken();
  if (userToken !== null) {
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={props => <Shopping {...props} userToken={userToken} />}
          />
          <Route
            path="/add"
            render={props => <AddTestItem {...props} userToken={userToken} />}
          />
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
        <button className="button" onClick={createNewToken}>
          Create New List
        </button>
      </div>
    );
  }
}

export default App;
