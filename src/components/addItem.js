import React from 'react';
import '../App.css';
import AddItemForm from './AddItemForm';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Add Item</h1>
        <AddItemForm userToken={this.props.userToken} />
      </div>
    );
  }
}

export default AddItem;
