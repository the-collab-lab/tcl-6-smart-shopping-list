import React from 'react';
import { withFirestore } from 'react-firestore';

const ShareList = () => {
  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Share List:
        <input type="text" name="token" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default withFirestore(ShareList);
