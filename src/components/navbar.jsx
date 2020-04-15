import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import '../css/navbar.css';

class Navbar1 extends Component {
  state = {
    isDownloading: false,
    link: ''
  }

  render() { 
    return (
      <Navbar collapseOnSelect expand="lg" bg="light">
        <Container>
          <Navbar.Brand className='mx-auto'>
            <Link to={`/`} onClick={() => this.props.resetState()}>
              <img
                src="/header1.jpg"
                className="brand-image"
                alt="React Bootstrap logo"
              />
            </Link>         
          </Navbar.Brand>
          <a 
            className={this.props.screen === 'sm' ? 'btn btn-dark btn-sm' : 'btn btn-dark'}
            href={this.state.link}
            target={'_blank'}
            download={`seema-sandesh-${this.props.date}.pdf`}
            disabled={this.state.isDownloading ? true : false}
            rel="noopener noreferrer"
          >
            {this.getIcon()}
          </a>
        </Container>
      </Navbar>
    );
  }

  getIcon() {
    if(this.state.isDownloading) {
      return (
        <React.Fragment>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span className="sr-only">Loading...</span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <FaDownload />
        </React.Fragment>
      );
    }
  }

  componentDidUpdate(prev) {
    if(this.props.date !== prev.date) {
      // console.log('updated', this.props.date);
      this.getFile();
    }
  }

  componentDidMount() {
    this.getFile();
  }

  getFile() {
    this.setState({ isDownloading: true });
    fetch(`/download/${this.props.date}`)
    .then(res => res.json())
    .then((response) => {
      if(response.code === 200){
        this.setState({ link: response.link, isDownloading: false });
      } else {
        throw new Error('file not found');
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({ isDownloading: false });
    });
  }

}
 
export default Navbar1;