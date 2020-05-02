import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class PaginationList extends Component {
  state = {  }
  render() { 
    return (
      <Form.Group className="my-auto">
        <Form.Control disabled={this.props.disabled} as="select" size={this.props.screen === 'sm' ? 'sm' : ''} value={this.props.activePage} onChange={(e) => this.props.handlePageChange(e.target.value)} custom>
          {this.getPaginatedList()}
        </Form.Control>
      </Form.Group>
    );
  }

  getPaginatedList(){
    let items = [];
    for (let number = 1; number <= this.props.numberOfPages; number++) {
      items.push(
        <option key={number} value={number}>
          Page {number}
        </option>
      );
    }
    return items;
  }

}
 
export default PaginationList;