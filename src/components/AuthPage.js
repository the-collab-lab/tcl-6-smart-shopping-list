import React from 'react';
import NavButton from './navbutton';
import '../CSS/Nav.css';

const AuthPage = () => {
  return (
    <nav id="nav">
      <NavButton path="signup" text="SignUp" />
    </nav>
  );
};

export default AuthPage;
