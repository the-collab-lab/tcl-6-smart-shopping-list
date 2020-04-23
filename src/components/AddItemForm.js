import React from 'react';
import { withFirestore } from 'react-firestore';
import { ITEMS } from '../../src/constants';
import '../CSS/AddItemForm.css';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      next_purchase: 14,
      user_token: this.props.userToken,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSchedule(event) {
    this.setState({ next_purchase: event.target.value });
  }

  handleSubmit(event) {
    const { name, next_purchase, user_token } = this.state;
    this.props.firestore
      .collection(ITEMS)
      .add({ name, next_purchase, user_token })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document:', error);
      });
    event.preventDefault();

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
      </form>
    );
  }
}

export default withFirestore(AddItemForm);
