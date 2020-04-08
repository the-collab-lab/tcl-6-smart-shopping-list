import React from 'react';
import { db } from './firebase';
import { FirestoreCollection } from 'react-firestore';

class AddTestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', category: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  handleNameChange(event) {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  handleCategoryChange(event) {
    console.log(event.target.value);
    this.setState({ category: event.target.value });
  }

  handleSubmit(event) {
    db.collection('testitems')
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

function TestList() {
  return (
    <FirestoreCollection
      path="testitems"
      sort="name:desc"
      render={({ data }) => {
        return (
          <div>
            <h1>Test Items</h1>
            <ul>
              {data.map(item => (
                <li key={item.id}>
                  {item.category} - {item.name}
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
}

export { TestList, AddTestItem };

// describe('firebase reads and writes', () => {
//   it('writes to the database', () => {
//     let collectionName = 'testitems';
//     let groceryItem = {
//       name: 'limes',
//       category: 'citrus',
//     };
// return db
//   .collection(collectionName)
//   .add(groceryItem)
//   .then(function(docRef) {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch(function(error) {
//     console.error('Error adding document: ', error);
//   });
//   });

//   it('read from the database', () => {
//     return db
//       .collection('testitems')
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           console.log(`${doc.id} => ${doc.data().name}`);
//         });
//       });
//   });
// });
