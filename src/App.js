import React, { Component } from 'react';
import './css/App.css';
import Navbar1 from './components/navbar';
import PaginationList from './components/pagination-list';
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
      loadingPages: true,
      numberOfPages: 0,
    }
    this.updateRoute();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.fetchAllPages();
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
        <Container>
          <div className="news-header">
            <PaginationList 
              activePage={this.state.activePage}
              handlePageChange={this.handlePageChange}
              numberOfPages={this.state.numberOfPages}
              startDate={this.state.startDate}
              screen={this.state.screen}
              disabled={this.state.imageName ? true : false }
            />
            <Datepicker
              startDate={this.state.startDate}
              handleChange={this.handleDateChange}
              screen={this.state.screen}
              disabled={this.state.imageName ? true : false }
            />
            <Sharing
              imageLink={window.location.href} 
              screen={this.state.screen} 
            />
          </div>
          { this.getContents() }
        </Container>
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
        <SingleNews imageName={this.getImageIdFromName()} />
      );
    } else {
      return (
        <Newspage
          startDate={this.state.startDate}
          activePage={this.state.activePage}
          onCarouselPageChange={this.onCarouselPageChange}
          pages={this.state.pages}
          loading={this.state.loadingPages}
        />
      );
    }
  }

  onCarouselPageChange = (page) => {
    // console.log(page);
    this.setState({ activePage: page+1 }, this.updateRoute);
  }

  handleDateChange = date => {
    // console.log(date);
    this.setState({
      startDate: this.formatDate(date),
      activePage: 1,
    }, () => {
      this.fetchAllPages();
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

  fetchAllPages(){
    this.setState({ loadingPages: true });
    // let headers = new Headers();
    // let str = process.env.AUTH_USERNAME + "sharmavipul92:Infinity92" + process.env.AUTH_PASSWORD;
    // const authString = Buffer.from(str).toString('base64');
    // console.log(str, authString, process.env);
    // headers.append('Authorization', 'Basic ' + authString);
    fetch(`/news/paper/${this.state.startDate}`)
    .then(res => res.json())
    .then(({pages}) => {
      this.setState({ pages, loadingPages: false, numberOfPages: Object.keys(pages).length }, () => {
        this.checkValidPageNumber();
      });
    })
    .catch(console.log)
    .finally(() => {
      this.setState({ loadingPages: false });
    })
  }

  checkValidPageNumber() {
    if(this.state.activePage > this.state.numberOfPages || this.state.activePage < 0){
      this.setState({activePage: 1}, this.updateRoute);
    }
  }

}

export default App;
