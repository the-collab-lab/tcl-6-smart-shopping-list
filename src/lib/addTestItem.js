import React from 'react';
import { withFirestore } from 'react-firestore';

class AddTestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', category: '' };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  handleSubmit(event) {
    this.props.firestore
      .collection('testitems')
      .add(this.state)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
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
          Category:
          <input
            type="text"
            value={this.state.category}
            onChange={this.handleCategoryChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default withFirestore(AddTestItem);
