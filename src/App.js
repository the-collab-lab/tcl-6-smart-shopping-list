import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import { ITEMS, USERS } from './constants';
import Header from './components/Header';
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
                  path="/detail/:itemName"
                  render={() => (
                    <ItemDetail userToken={userToken} list={data} />
                  )}
                />
              </div>
            );
          }}
        />
      </Router>
    );
  } else {
    return (
      <div className="App">
        <Header />
        <h2 className="tagline">
          Eggs, bread, cheese and all the things you need.
        </h2>
        <p className="home">Get started by creating a new list.</p>
        <button className="button" onClick={createToken}>
          Create New List
        </button>
        <p className="home">Join an existing shopping list.</p>
        <ShareList setToken={setToken} />
      </div>
    );
  }
}

export default App;
