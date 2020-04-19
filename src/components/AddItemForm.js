import React from 'react';
import { withFirestore } from 'react-firestore';
import '../CSS/AddItemForm.css';
class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      next_purchase: null,
      last_purchase: null,
      user_token: 'shpongle',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    this.props.firestore
      .collection('itemform')
      .add(this.state)
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
      ext_purchase: null,
      last_purchase: null,
      user_token: 'shpongle',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label class="name">
          Name:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </label>
        <br />
        <label class="schedule">
          Schedule:
          <select value={this.state.schedule}>
            <option value="7">Soon</option>
            <option value="14">Kind Of Soon</option>
            <option value="30">Not Soon</option>
          </select>
        </label>
        <br />
        <label class="lastpurchase">Last Purchased Date:</label>
      </form>
    );
  }
}

export default withFirestore(AddItemForm);
