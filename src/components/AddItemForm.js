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
      invalid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
      hasDupe: false,
      invalid: false,
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

    const invalid = name_normalized.length > 0;

    if (!invalid) {
      this.setState({ invalid: true });
      return;
    }

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
            Name
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label className="schedule">
            How soon do you need to buy {this.state.name}?
          </label>
          <span className="btn-container">
            <button
              type="submit"
              className="btn1"
              value="7"
              onClick={this.handleSchedule}
            >
              Soon
            </button>
            <button
              type="submit"
              className="btn2"
              value="14"
              onClick={this.handleSchedule}
            >
              Kind of soon
            </button>
            <button
              type="submit"
              className="btn3"
              value="30"
              onClick={this.handleSchedule}
            >
              Not so soon
            </button>
          </span>
          <br />
          {this.state.hasDupe && (
            <p className="error">
              {this.state.name} has already been added to your shopping list.
            </p>
          )}
          {this.state.invalid && <p className="error">Invalid item name.</p>}
        </form>
        <Nav />
      </>
    );
  }
}

export default withFirestore(AddItemForm);
