import React from 'react';
import getToken from '../../src/tokenScript';

class TokenButton extends React.Component {
  handleClick() {
    localStorage.setItem('user_token', getToken());
  }
  render() {
    return <button onClick={this.handleClick}>Create User Token</button>;
  }
}

export default TokenButton;
