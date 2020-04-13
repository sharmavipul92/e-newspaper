import React, { Component } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import '../css/navbar.css';

class Navbar1 extends Component {
  state = {
    isDownloading: false
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
          <Button 
            className={this.props.screen === 'sm' ? 'btn-sm' : ''}
            variant="dark" 
            onClick={!this.state.isDownloading ? () => this.getFile() : null}
            disabled={this.state.isDownloading ? true : false}
          >
            {this.getIcon()}
          </Button>
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

  getFile() {
    this.setState({ isDownloading: true });
    fetch(`/download/${this.props.date}`)
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        return response.blob();
      } else {
        throw new Error('file not found');
      }
    })
    .then((blob) => {
      console.log(blob);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `seema-sandesh-${this.props.date}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      this.setState({ isDownloading: false });
    })
    .catch((error) => {
      console.log(error);
      this.setState({ isDownloading: false });
    });
  }

}
 
export default Navbar1;