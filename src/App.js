import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';

// Components
import NavButton from './components/navbutton';
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
          path="items"
          filter={['user_token', '==', userToken]}
          render={({ data }) => {
            return (
              <div className="App">
                <Route exact path="/" render={() => <Shopping list={data} />} />
                <Route
                  path="/add"
                  render={props => (
                    <AddItem userToken={userToken} list={data} />
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
        <button className="button" onClick={createToken}>
          Create New List
        </button>
        <ShareList setToken={setToken} />
      </div>
    );
  }
}

export default App;
