import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import { ITEMS, USERS } from './constants';

// Components
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
