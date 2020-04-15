import React from 'react';
import TestList from '../lib/testList';
import '../App.css';

function Shopping(props) {
  return <TestList userToken={props.userToken} />;
}

export default Shopping;
