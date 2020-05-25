import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import { ITEMS, USERS } from './constants';
import Header from './components/Header';
import Shopping from './components/shopping';
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
                <Route exact path={`/`}>
                  <Shopping userToken={userToken} list={data} />
                </Route>
                <Route path="/detail/:itemId?">
                  <Shopping userToken={userToken} list={data} />
                </Route>
                <Route path="/add">
                  <AddItem userToken={userToken} list={data} />
                </Route>
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
