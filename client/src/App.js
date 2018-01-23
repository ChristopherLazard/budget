import React from 'react';
import { Header, Segment, Table, Button } from 'semantic-ui-react';
import moment from 'moment';
import AddEntry from './AddEntry';

class App extends React.Component {
  state = {
    debits: [
      { id: 1, amt: 100.0, date: '01/20/18', description: 'BTC' },
      { id: 2, amt: 47.50, date: '01/18/18', description: 'Utils' },
    ],
    credits: [
      { id: 3, amt: 1000, date: '01/01/18', description: 'Paycheck' },
    ],
    addDebits: false,
    addCredits: false,
  }

  toggleAdd = (type) => {
    let target = `add${type}`;
    this.setState({ [target]: !this.state[target] });
  }

  add = (type, date, amt, description) => {
    type = type.toLowerCase();
    let existing = this.state[type];
    let id = Math.random() * 1000;
    let entry = { id, date, amt: parseFloat(amt), description }
    this.setState({ [type]: [...existing, entry] });
  }

  tableBuilder = (header) => {
    return (
      <Segment>
        <Header as="h1">{header}</Header>
        <Button onClick={() => this.toggleAdd(header) }>Add</Button>
        <Table striped>
          <Table.Header> 
            <Table.Row>
              { ['Date', 'Amt', 'Description'].map( h =>
                  <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
                )
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.tableData(header.toLowerCase()) }
          </Table.Body>
        </Table>
      </Segment>
    )
  }

  tableData = (type) => {
    const data = this.state[type].sort(this.compare);
    return data.map( entry =>
      <Table.Row key={entry.id}>
        <Table.Cell>
          {entry.date}
        </Table.Cell>
        <Table.Cell>
          {entry.amt.toFixed(2)}
        </Table.Cell>
        <Table.Cell>
          {entry.description}
        </Table.Cell>
      </Table.Row>
    )
  }

  compare = (a,b) => {
    let date1 = moment(new Date(a.date)).format('MM/DD/YYYY');
    let date2 = moment(new Date(b.date)).format('MM/DD/YYYY');
    if (date1 < date2)
      return -1
    if (date1 > date2)
      return 1
    return 0;
  }

  total = () => {
    let debits = this.state.debits.map( d => d.amt );
    let credits = this.state.credits.map( c => c.amt );
    let totalDebits = debits.reduce( (num, total) => num + total );
    let totalCredits = credits.reduce( (num, total) => num + total );
    let total = totalCredits - totalDebits;
    let color = total < 0 ? 'red' : 'green';
    return { total, color }
  }


  render() {
    const { total = 0, color } = this.total();
    const { addDebits, addCredits } = this.state;

    return (
      <div>
        { addDebits ? 
            <AddEntry 
              type="Debits" 
              toggleAdd={this.toggleAdd} 
              add={this.add } 
            /> : 
           this.tableBuilder('Debits') 
        }
        { addCredits ? 
            <AddEntry 
              type="Credits" 
              toggleAdd={this.toggleAdd} 
              add={this.add } 
            /> : 
           this.tableBuilder('Credits') 
        }
        <Segment>
          <Header as="h1" style={{ color }}>${total}</Header>
        </Segment>
      </div>
    );
  }
}

export default App;