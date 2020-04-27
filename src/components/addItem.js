import React from 'react';
import '../App.css';
import AddItemForm from './AddItemForm';

class AddItem extends React.Component {
  render() {
    return (
      <div>
        <h1>Add Item</h1>
        <AddItemForm userToken={this.props.userToken} list={this.props.list} />
      </div>
    );
  }
}

export default AddItem;
