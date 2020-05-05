import React from 'react';
import { withFirestore } from 'react-firestore';

class AddTestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', last_purchase: '', next_purchase: 7 };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNextPurchaseChange = this.handleNextPurchaseChange.bind(this);
    this.handleLastPurchaseChange = this.handleLastPurchaseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleLastPurchaseChange(event) {
    this.setState({ last_purchase: event.target.value });
  }

  handleNextPurchaseChange(event) {
    this.setState({ next_purchase: parseInt(event.target.value) });
  }

  handleSubmit(event) {
    this.props.firestore
      .collection('users')
      .doc(this.props.userToken)
      .collection('shopping_list')
      .add(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <label>
          Last Purchase:
          <input
            type="date"
            value={this.state.last_purchase}
            onChange={this.handleLastPurchaseChange}
          />
        </label>
        <label>
          Next Purchase:
          <select
            name="next"
            id="next-purchase"
            onChange={this.handleNextPurchaseChange}
          >
            <option value="7">Soon</option>
            <option value="14">Kind of soon</option>
            <option value="30">Not soon</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default withFirestore(AddTestItem);
