import React, { Component } from 'react';
import './App.css';
import Navbar1 from './components/navbar';
import Pagination1 from './components/pagination';
import Newspage from './components/news-page';
import { Container } from 'react-bootstrap';
import Datepicker from './components/datepicker';
import { BrowserRouter as Router } from "react-router-dom";
class App extends Component {
  state = {
    startDate: new Date(),
    numberOfPages: 12,
    activePage: 1,
  }

  render() { 
    return (
      <Router>
        <Navbar1 />
        <Container>
          <div className="row">
            <div className="col-md-9">
              <Pagination1 numberOfPages={this.state.numberOfPages} activePage={this.state.activePage} handleChange={this.handlePageChange} />
            </div>
            <div className="col-md-3 my-auto">
              <Datepicker startDate={this.state.startDate} handleChange={this.handleDateChange} />
            </div>
          </div>
          <div className="row">
            <Newspage startDate={this.state.startDate} activePage={this.state.activePage} />
          </div>
        </Container>
      </Router>
    );
  }

  handleDateChange = date => {
    console.log(date);
    this.setState({
      startDate: date
    });
  };

  handlePageChange = e => {
    // console.log(e.target.text);
    if(e.target.text){
      this.setState({
        activePage: parseInt(e.target.text)
      });
    }
  };

}

export default App;
