/* eslint-disable */
import React, { Component } from 'react';
import { ButtonToolbar, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import "../css/custom-pagination.css";

class CustomPagination extends Component {
  state = {  }
  render() { 
    return (
      <div className="custom-pagination">
        <Dropdown>
          <Dropdown.Toggle variant="primary">Pages</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <ButtonToolbar className="button-group-toolbar">
                {this.getButtonGroups()}
              </ButtonToolbar>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonToolbar className="button-group-toolbar">
          {this.getButtonGroups()}
        </ButtonToolbar>
      </div>
    );
  }

  getButtonGroups() {
    let keyCount = 1;
     return this.props.numberOfPages.categories.map(key => {
      return (
        <div key={key.name+keyCount++} className="button-group-wrapper">
          <span className="text">{key.name}</span>
          <ButtonGroup>
            {this.getButtons(key.pages)}
          </ButtonGroup>
        </div>
      );
    });
  }

  getButtons(pages) {
    const selectedDate = this.parseDate(this.props.startDate);
    return (
      pages.map(number => {
        return (
          <LinkContainer to={`/${selectedDate}/${number}`} key={number} onClick={() => this.props.onPageChange(number)}>
            <Button
              variant={this.props.activePage == number ? "primary" : "outline-primary"}
            >
              {number}
            </Button>
          </LinkContainer>
        );
      })
    )
  }

  parseDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

}
 
export default CustomPagination;