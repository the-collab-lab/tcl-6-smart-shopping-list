import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';

const ShareList = () => {
  const [isError, toggleError] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    toggleError(!isError);
    console.log(event.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Share List:
          <input type="text" name="token" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{isError ? <p>ERROR</p> : null}</div>
    </div>
  );
};

export default withFirestore(ShareList);
