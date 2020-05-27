import React from 'react';
import { withFirestore } from 'react-firestore';
import { ITEMS, USERS } from '../../src/constants';
import Nav from './Nav';
import '../CSS/AddItemForm.css';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      next_purchase: 14,
      last_purchased: '',
      number_purchases: 0,
      hasDupe: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
      hasDupe: false,
    });
  }

  normalizeUserInput(item) {
    item = item.toLowerCase().trim();
    var pattern = /[^0-9a-z]/g;
    item = item.replace(pattern, '');
    return item;
  }

  handleSchedule(event) {
    this.setState({ next_purchase: parseInt(event.target.value) });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { state, props } = this;
    const name_normalized = this.normalizeUserInput(state.name);
    const hasDupe = props.list.some(
      item => item.name_normalized === name_normalized,
    );

    if (hasDupe) {
      this.setState({ hasDupe });
      return;
    }

    props.firestore
      .collection(`${USERS}/${props.userToken}/${ITEMS}`)
      .add({
        name: state.name,
        name_normalized,
        next_purchase: state.next_purchase,
        last_purchased: state.last_purchased,
        number_purchases: state.number_purchases,
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document:', error);
      });

    //To reset the input field after the user hits submit
    this.setState({
      name: '',
      next_purchase: 14,
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label className="name">
            Name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label className="schedule">
            <button className="time-frame square1">Soon</button>
            <button className="time-frame square2">Kind of soon</button>
            <button className="time-frame square3">Not so soon</button>
          </label>
          <br />
          {this.state.hasDupe && (
            <p>
              {this.state.name} has already been added to your shopping list.
            </p>
          )}
        </form>
        <Nav />
      </>
    );
  }
}

export default withFirestore(AddItemForm);
