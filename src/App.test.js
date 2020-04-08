import React from 'react';
import ReactDOM from 'react-dom';
import { FirestoreProvider } from 'react-firestore';
import { fb } from './lib/firebase';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FirestoreProvider firebase={fb}>
      <App />
    </FirestoreProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
