import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../css/pagination.css';

class Pagination1 extends Component {
  state = {}
  
  render() { 
    return (
      <Pagination className='justify-content-center mt-3'>
        {this.getPaginatedList()}
      </Pagination>
    );
  }

  parseDate() {
    const date = this.props.startDate;
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  getPaginatedList(){
    const selectedDate = this.parseDate();
    let items = [];
    for (let number = 1; number <= this.props.numberOfPages; number++) {
      items.push(
        <LinkContainer to={`/${selectedDate}/${number}`} key={number} onClick={() => this.props.handleChange(number)}>
          <Pagination.Item key={number} active={number === this.props.activePage}>
            {number}
          </Pagination.Item>
        </LinkContainer>
      );
    }
    return items;
  }
}
 
export default Pagination1;