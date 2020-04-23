import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
//import { db } from '../lib/firebase';
import '../CSS/AddItemForm.css';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      name_normalized: '',
      next_purchase: 14,
      user_token: this.props.userToken,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name_normalized = this.normalizeItem(event.target.value);
    this.setState({
      name: event.target.value,
      name_normalized: name_normalized,
    });
  }

  handleSchedule(event) {
    this.setState({ next_purchase: event.target.value });
  }

  handleSubmit(event) {
    const { name, name_normalized, next_purchase, user_token } = this.state;
    this.props.firestore
      .collection('items')
      .add({ name, name_normalized, next_purchase, user_token })
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

  // normalize user input
  normalizeItem(item) {
    item = item.toLowerCase().trim();
    var pattern = /[^0-9a-z]/g;
    item = item.replace(pattern, '');
    //console.log('item', item);
    return item;
  }

  /*   getListItems() {
    db.collection('items').get().then((snapshot) => {
        //console.log(snapshot.doc);
        snapshot.docs.forEach(doc => {
          console.log(doc.data.name);
        })
      })
    return;
  } */

  render() {
    console.log('regex', this.normalizeItem(this.state.name));
    let normalizedInput = this.normalizeItem(this.state.name);

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
        <FirestoreCollection
          path="items"
          filter={['name_normalized', '==', normalizedInput]}
          render={({ data }) => {
            let message = <div></div>;
            if (data.length > 0) {
              data.forEach(item => {
                if (this.normalizeItem(item.name) === normalizedInput) {
                  message = (
                    <p>
                      {item.name} has already been added to your shopping list.
                    </p>
                  );
                }
              });
            }
            return message;
          }}
        />
      </form>
    );
  }
}

export default withFirestore(AddItemForm);
