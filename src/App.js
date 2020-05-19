import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import { ITEMS, USERS } from './constants';

// Components
import NavButton from './components/navbutton';
import Shopping from './components/shopping';
import ItemDetail from './components/ItemDetail';
import AddItem from './components/addItem';
import ShareList from './components/ShareList';
import { useToken } from './lib/useToken';
import './App.css';

function App() {
  const [userToken, createToken, setToken] = useToken();

  if (userToken) {
    return (
      <Router>
        <FirestoreCollection
          path={`${USERS}/${userToken}/${ITEMS}`}
          render={({ data }) => {
            return (
              <div className="App">
                <Route
                  exact
                  path="/"
                  render={() => <Shopping userToken={userToken} list={data} />}
                />
                <Route
                  path="/add"
                  render={() => <AddItem userToken={userToken} list={data} />}
                />
                <Route
                  path="/detail/:itemId"
                  render={() => (
                    <ItemDetail userToken={userToken} list={data} />
                  )}
                />
                <nav id="nav">
                  <NavButton path="/" text="Shopping" />
                  <NavButton path="/add" text="Add Item" />
                </nav>
              </div>
            );
          }}
        />
      </Router>
    );
  } else {
    return (
      <div className="App">
        <h1>GIMME THAT THING</h1>
        <h2>The best place in cyberspace to find what you need.</h2>
        <button className="button" onClick={createToken}>
          Create New List
        </button>
        <ShareList setToken={setToken} />
      </div>
    );
  }
}

export default App;
