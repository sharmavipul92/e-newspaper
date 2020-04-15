import React, { Component } from 'react';
import './css/App.css';
import Navbar1 from './components/navbar';
import Pagination1 from './components/pagination';
import SingleNews from './components/single-news';
import Sharing from './components/sharing';
import Newspage from './components/news-page';
import { Container } from 'react-bootstrap';
import Datepicker from './components/datepicker';
import { HashRouter as Router } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class App extends Component {

  constructor(props) {
    super(props);
    const hashValue = window.location.hash;
    const paths = hashValue.split(/[/#]+/).filter(Boolean);
    const startDate = (paths[0] && !isNaN(Date.parse(paths[0])) && this.isValidDate(paths[0])) ? paths[0] : this.formatDate(new Date());
    const activePage = paths[1] ? parseInt(paths[1]) : 1;
    const imageName = (paths[2] && paths[2].length > 0) ? paths[2] : '';
    this.state = {
      startDate,
      activePage,
      imageName,
      numberOfPages: {
        total: 8,
        categories: [{
          name: "National",
          pages: [1,2]
        },{
          name: "Ganganagar",
          pages: [3,4]
        },{
          name: "Jaipur",
          pages: [5,6]
        },{
          name: "National",
          pages: [7,8]
        }],
      },
    }
    this.updateRoute();
  }

  componentDidMount() {
    if(this.state.activePage >= this.state.numberOfPages.total || this.state.activePage < 0){
      this.setState({activePage: 1});
      window.location.hash = `${this.state.startDate}/1`;
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ screen: window.innerWidth <= 770 ? 'sm' : 'md' });
  }

  isValidDate(dateStr) {
    let [year, month, date] = dateStr.split('-');
    if(date && date.length === 2 && month && month.length === 2 && year && year.length === 4) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Router>
        <Navbar1 
          resetState={this.resetState}
          date={(this.state.imageName) ? this.getImageIdFromName() : this.state.startDate}
          screen={this.state.screen}
        />
        { this.getContents() }
      </Router>
    );
  }

  getImageIdFromName(){
    let name = `${this.state.startDate}-${this.state.activePage}-${this.state.imageName}`;
    return name;
  }

  getContents(){
    if(this.state.imageName) {
      return (
        <Container>
          <div className="news-header">
            <Datepicker
              startDate={this.state.startDate}
              handleChange={this.handleDateChange}
              screen={this.state.screen}
              disabled={true}
            />
            <Sharing
              imageLink={window.location.href} 
              screen={this.state.screen} 
            />
          </div>
          <SingleNews imageName={this.getImageIdFromName()} />
        </Container>
      );
    } else {
      return (
        <Container>
          <div className="news-header">
            <Pagination1
              activePage={this.state.activePage}
              handlePageChange={this.handlePageChange}
              numberOfPages={this.state.numberOfPages}
              startDate={this.state.startDate}
              screen={this.state.screen}
            />
            <Datepicker
              startDate={this.state.startDate}
              handleChange={this.handleDateChange}
              screen={this.state.screen}
            />
            <Sharing
              imageLink={window.location.href} 
              screen={this.state.screen} 
            />
          </div>
          <Newspage
            startDate={this.state.startDate}
            activePage={this.state.activePage}
            onCarouselPageChange={this.onCarouselPageChange}
          />
        </Container>
      );
    }
  }

  onCarouselPageChange = (page) => {
    // console.log(page);
    this.setState({ activePage: page+1 }, () => {
      this.updateRoute();
    });
  }

  handleDateChange = date => {
    // console.log(date);
    this.setState({
      startDate: this.formatDate(date),
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

  resetState = () => {
    this.setState({
      startDate: this.formatDate(new Date()),
      activePage: 1,
      imageName: undefined,
    });
  }

  updateRoute() {
    window.location.hash = `${this.state.startDate}/${this.state.activePage}/${this.state.imageName}`;
  }

  formatDate(d) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }

}

export default App;
