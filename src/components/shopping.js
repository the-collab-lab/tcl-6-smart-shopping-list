import React from 'react';
import '../App.css';
import { ITEMS, USER_TOKEN } from '../constants';
import { FirestoreCollection } from 'react-firestore';
import ListItem from './ListItem';

function Shopping(props) {
  return (
    <FirestoreCollection
      path={ITEMS}
      filter={[USER_TOKEN, '==', props.userToken]}
      render={({ data }) => {
        return (
          <div>
            <h1>Shopping List</h1>
            <ul>
              {data.map(item => (
                <ListItem key={item.id} item={item} token={props.userToken} />
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

export default Shopping;
