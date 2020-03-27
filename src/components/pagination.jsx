import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/pagination.css';

class Pagination1 extends Component {
  state = {}
  
  render() { 
    return (
      <Pagination className='justify-content-center mt-3' onClick={(e) => this.props.handleChange(e)}>
        {this.getPaginatedList()}
      </Pagination>
    );
  }

  getPaginatedList(){
    let items = [];
    for (let number = 1; number <= this.props.numberOfPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.props.activePage}>
          <Link to={`/${number}`}>{number}</Link>
          {/* {number} */}
        </Pagination.Item>,
      );
    }
    return items;
  }
}
 
export default Pagination1;