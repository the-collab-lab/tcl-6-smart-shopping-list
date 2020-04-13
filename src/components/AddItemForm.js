import React from 'react';
import { format } from 'prettier';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: '',
    };
  }

  render() {
    return (
      <form>
        <label>
          Item:
          <input type="text" value={this.state.value} />
          // need to add onChange but need to complete more research
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
