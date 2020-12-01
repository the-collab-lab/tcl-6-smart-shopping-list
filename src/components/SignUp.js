import React from 'react';
import firebase from 'firebase';
import '../CSS/SignUp.css';

const SignUp = () => {
  const handleSignUp = event => {
    event.preventDefault();
    const email = event.target.username.value;
    const password = event.target.password.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('I did a thing!');
        console.log(user);
      })
      .catch(error => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ..
      });
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">
          <input
            type="email"
            name="username"
            id="username"
            placeholder="Username"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="confirm-password">
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm password"
          />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
};

export default SignUp;
