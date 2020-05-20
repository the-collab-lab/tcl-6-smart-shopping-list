import React from 'react';
import NavButton from './navbutton';

const Nav = () => {
  return (
    <nav id="nav">
      <NavButton path="/" text="Shopping" />
      <NavButton path="/add" text="Add Item" />
    </nav>
  );
};

export default Nav;
