import React, { Component } from 'react';
import '../css/single-news.css';

class SingleNews extends Component {
  state = {
    newsLink: ''
  }

  componentDidMount() {
    fetch(`http://localhost:8080/news/${this.props.imageName}`)
    .then(res => res.json())
    .then(({newsLink}) => {
      this.setState({ newsLink });
    })
    .catch(console.log)
  }

  render() { 
    return (
      <div>
        <img src={this.state.newsLink} alt=''></img>
      </div>
    );
  }
}
 
export default SingleNews;