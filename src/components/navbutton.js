import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const NavButton = props => (
  <NavLink exact to={props.path} activeClassName="selected" className="button">
    {props.text}
  </NavLink>
);

export default NavButton;
//thingy
