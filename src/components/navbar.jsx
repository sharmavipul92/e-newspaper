import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

class Navbar1 extends Component {
  state = {  }
  render() { 
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Seema Sandesh e-newspaper</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    );
  }
}
 
export default Navbar1;