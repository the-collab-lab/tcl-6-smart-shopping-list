import React from 'react';
import '../CSS/SignUp.css';

const SignUp = () => {
  return (
    <>
      <form>
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
