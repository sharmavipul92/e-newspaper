import React, { Component } from 'react';
import './css/App.css';
import Navbar1 from './components/navbar';
import Pagination1 from './components/pagination';
import SingleNews from './components/single-news';
import Sharing from './components/sharing';
import Newspage from './components/news-page';
import { Container } from 'react-bootstrap';
import Datepicker from './components/datepicker';
// import CustomPagination from "./components/custom-pagination";
import { HashRouter as Router } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class App extends Component {

  constructor(props) {
    super(props);
    const paths = window.location.hash.substring(2).split('/');
    const startDate = (paths[0] && !isNaN(Date.parse(paths[0]))) ?  new Date(paths[0]) : new Date() ;
    const activePage = paths[1] ? parseInt(paths[1]) : 1;
    const imageName = (paths[2] && paths[2].length > 0) ? paths[2] : undefined;
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
  }

  componentDidMount() {
    if(this.state.activePage >= this.state.numberOfPages.total || this.state.activePage < 0){
      this.setState({activePage: 1});
      window.location.hash = `${this.formatDate(this.state.startDate)}/1`;
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({ screen: window.innerWidth <= 770 ? 'sm' : 'md' });
  }

  // render() { 
  //   return (
  //     <Router>
  //       <Navbar1 />
  //       <Container>
  //         <div className="row">
  //           <div className="col-md-9">
  //             <Pagination1 numberOfPages={this.state.numberOfPages} startDate={this.state.startDate} activePage={this.state.activePage} handleChange={this.handlePageChange} />
  //           </div>
  //           <div className="col-md-3 my-auto">
  //             <Datepicker startDate={this.state.startDate} handleChange={this.handleDateChange} />
  //           </div>
  //         </div>
  //         <div className="row">
  //           <Newspage startDate={this.state.startDate} activePage={this.state.activePage} />
  //         </div>
  //       </Container>
  //     </Router>
  //   );
  // }

  render() {
    return (
      <Router>
        <Navbar1 
          resetState={this.resetState}
          date={this.formatDate(this.state.startDate)}
          screen={this.state.screen}
        />
        { this.getContents() }
      </Router>
    );
  }

  getImageIdFromName(){
    let name = `${this.formatDate(this.state.startDate)}-${this.state.activePage}-${this.state.imageName}`;
    return name;
  }

  getContents(){
    if(this.state.imageName) {
      return (
        <Container>
          <div className="news-header">
            <div></div>
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
          <div style={{ margin: "0rem -1rem" }}>
            <Newspage
              startDate={this.state.startDate}
              activePage={this.state.activePage}
            />
          </div>
        </Container>
      );
    }
  }

  handleDateChange = date => {
    console.log(date);
    this.setState({
      startDate: date,
      activePage: 1,
    }, () => {
      this.updateRoute();
    });
  };

  handlePageChange = activePage => {
    console.log(activePage);
    this.setState({
      activePage
    });
  };

  resetState = () => {
    this.setState({
      startDate: new Date(),
      activePage: 1,
      imageName: undefined,
    });
  }

  updateRoute() {
    window.location.hash = `${this.formatDate(this.state.startDate)}/${this.state.activePage}`;
  }

  formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

}

export default App;
