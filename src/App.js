import React, { Component } from 'react';
import './App.css';
import Navbar1 from './components/navbar';
import Pagination1 from './components/pagination';
import Newspage from './components/news-page';
import { Container } from 'react-bootstrap';
import Datepicker from './components/datepicker';
import { HashRouter as Router } from "react-router-dom";
class App extends Component {

  constructor(props) {
    super(props);
    // debugger;
    const paths = window.location.hash.substring(2).split('/');
    const startDate = paths[0] && !isNaN(Date.parse(paths[0])) ?  new Date(paths[0]) : new Date() ;
    const activePage = paths[1] ? parseInt(paths[1]) : 1;
    this.state = {
      startDate,
      activePage,
      numberOfPages: 12,
    }
  }

  componentDidMount() {
    if(this.state.activePage >= this.state.numberOfPages || this.state.activePage < 0){
      this.setState({activePage: 1});
      window.location.hash = `${this.formatDate(this.state.startDate)}/1`;
    }
  }

  // state = {
  //   startDate: new Date(),
  //   numberOfPages: 12,
  //   activePage: 1,
  // }

  render() { 
    return (
      <Router>
        <Navbar1 />
        <Container>
          <div className="row">
            <div className="col-md-9">
              <Pagination1 numberOfPages={this.state.numberOfPages} startDate={this.state.startDate} activePage={this.state.activePage} handleChange={this.handlePageChange} />
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
    // console.log(date);
    this.setState({
      startDate: date,
      activePage: 1,
    }, () => {
      this.updateRoute();
    });
  };

  handlePageChange = activePage => {
    // console.log(activePage);
    this.setState({
      activePage
    });
  };

  updateRoute() {
    // console.log(this.state);
    // debugger;
    // const paths = window.location.hash.split('/')
    // const pageNumber = paths[paths.length-1];
    window.location.hash = `${this.formatDate(this.state.startDate)}/${this.state.activePage}`;
  }

  formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

}

export default App;
