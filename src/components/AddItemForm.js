import React from 'react';
import { withFirestore } from 'react-firestore';
import '../CSS/AddItemForm.css';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      next_purchase: 14,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  normalizeUserInput(item) {
    item = item.toLowerCase().trim();
    var pattern = /[^0-9a-z]/g;
    item = item.replace(pattern, '');
    return item;
  }

  handleSchedule(event) {
    this.setState({ next_purchase: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { state, props } = this;

    const name_normalized = this.normalizeUserInput(state.name);
    const hasDupe = props.list.some(
      item => item.name_normalized === name_normalized,
    );

    props.firestore
      .collection('items')
      .add({
        name: state.name,
        name_normalized,
        next_purchase: state.next_purchase,
        user_token: props.userToken,
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
          Schedule:
          <select
            className="schedule-btn"
            value={this.state.next_purchase}
            onChange={this.handleSchedule}
          >
            <option value="7">Soon</option>
            <option value="14">Kind Of Soon</option>
            <option value="30">Not Soon</option>
          </select>
        </label>
        <br />
        <input className="submit-btn" type="submit" value="Submit" />
        {this.state.hasDupe && (
          <p>{this.state.name} has already been added to your shopping list.</p>
        )}
      </form>
    );
  }
}

export default withFirestore(AddItemForm);
