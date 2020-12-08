import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import { ITEMS, USERS } from './constants';
import Header from './components/Header';
import AuthPage from './components/AuthPage';
import SignUp from './components/SignUp';
import Shopping from './components/shopping';
import AddItem from './components/addItem';
import ShareList from './components/ShareList';
import { useToken } from './lib/useToken';
import './App.css';
import './CSS/colors.css';

function App() {
  const [userToken, createToken, setToken] = useToken();
  console.log(userToken);
  if (userToken) {
    return (
      <Router>
        <FirestoreCollection
          path={`${USERS}/${userToken}/${ITEMS}`}
          render={({ data }) => {
            return (
              <div className="App">
                <Switch>
                  <Route
                    path="/add"
                    render={() => <AddItem userToken={userToken} list={data} />}
                  />
                  <Route
                    path="/list/:itemId?"
                    render={() => (
                      <Shopping userToken={userToken} list={data} />
                    )}
                  />
                </Switch>
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
        <Router>
          <Switch>
            <Route
              path="/signup"
              render={() => <SignUp setToken={setToken} />}
            />

            <Route path="/" render={() => <AuthPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
