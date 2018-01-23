import React from 'react';
import { Form, Button, Header } from 'semantic-ui-react';

class AddEntry extends React.Component {
  state = { amt: '', date: '', description: '' }

  handleChange = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { amt, date, description } = this.state;
    const { add, type, toggleAdd } = this.props;
    add(type, date, amt, description);
    toggleAdd(type);
  }

  render() {
    const { toggleAdd, type } = this.props;
    const { amt, description, date } = this.state;
    return (
      <div>
        <Button onClick={() => toggleAdd(type)}>Cancel</Button>
        <Header as="h1">Add {type}</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Amt"
            name="amt"
            value={amt}
            required
            onChange={this.handleChange}
          />
          <Form.Input
            label="Date"
            name="date"
            placeholder="mm/dd/yy"
            required
            value={date}
            onChange={this.handleChange}
          />
          <Form.Input
            label="Description"
            name="description"
            required
            value={description}
            onChange={this.handleChange}
          />
          <Form.Button>Save</Form.Button>
        </Form>
      </div>
    )
  }
}

export default AddEntry;