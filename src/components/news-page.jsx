import React, { Component } from 'react';
import '../css/news-page.css';

class Newspage extends Component {
  state = {
    loading: true,
    news: [],
    mainPage: '',
    hdc: ''
  }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activePage !== this.props.activePage || prevProps.startDate !== this.props.startDate) {
      this.setState({loading: true, news: [], mainPage: '', hdc: ''});
      this.myRef = React.createRef();
      this.fetchData();
    }
  }

  fetchData() {
    fetch(`/news/${this.formatDate(this.props.startDate)}/${this.props.activePage}`)
    .then(res => res.json())
    .then(({code, news, mainPage}) => {
      if(code === 200){
        this.setState({ news, mainPage, loading: false });
      } else {
        this.setState({loading: false});
      }
    })
    .catch(console.log)
  }

  formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  render() { 
    if(this.state.loading) {
      return <div>loading...</div>;
    } else if(!this.state.mainPage) {
      return <div>Some problem in fetching the page.</div>;
    }
    return (
      <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1142 1800" preserveAspectRatio="xMinYMin meet">
          <image width="1142" height="1800" xlinkHref={this.state.mainPage}>
          </image>
          {
            this.state.news.map(snippet => {
              if(!snippet.coordinates) return '';
              let [x, y, width, height] = snippet.coordinates.split(',');
              return (
                <a key={snippet.id} xlinkHref={snippet.link} target="_blank">
                  <rect className="news" x={x+'%'} y={y+'%'} width={width+'%'} height={height+'%'} />
                </a>
              );
            })
          }
        </svg>
      </div>
    );
  }
}
 
export default Newspage;