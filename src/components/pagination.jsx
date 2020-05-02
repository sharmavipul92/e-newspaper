import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../css/pagination.css';

class Pagination1 extends Component {
  state = {}
  
  render() { 
    return (
      <Pagination className={this.paginationClasses()}>
        {this.getPaginatedList()}
      </Pagination>
    );
  }

  paginationClasses() {
    let classes = 'justify-content-center mt-3';
    if(this.props.screen === 'sm') {
      return classes + ' pagination-sm';
    }
    return classes;
  }

  getPaginatedList(){
    let items = [];
    for (let number = 1; number <= this.props.numberOfPages; number++) {
      items.push(
        <LinkContainer to={`/${this.props.startDate}/${number}`} key={number} onClick={() => this.props.handlePageChange(number)}>
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