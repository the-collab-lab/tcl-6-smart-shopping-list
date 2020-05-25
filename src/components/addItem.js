import React from 'react';
import '../App.css';
import Header from './Header';
import AddItemForm from './AddItemForm';

class AddItem extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <h2>Add Item</h2>
          <AddItemForm
            userToken={this.props.userToken}
            list={this.props.list}
          />
        </main>
      </>
    );
  }
}

export default AddItem;
