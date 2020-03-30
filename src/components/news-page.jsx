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
    fetch(`http://localhost:8080/news/${this.formatDate(this.props.startDate)}/${this.props.activePage}`)
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
        {/* <canvas id='myCanvas'></canvas>
        <img ref={this.myRef} className='mw-100' src={this.state.mainPage} alt="Workplace" useMap="#workmap"/>

        <map name="workmap">
          {this.state.news.map(snippet => (
            <area key={snippet.id} shape="rect" target="_blank" onMouseOver={e => this.drawRect(e, snippet.coordinates)} onMouseOut={e => this.myLeave(e)} coords={snippet.coordinates} alt="Computer" href={snippet.link}/>
          ))}
        </map> */}
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1142 1800" preserveAspectRatio="xMinYMin meet">
          <image width="1142" height="1800" xlinkHref={this.state.mainPage}>
          </image>
          {/* <a xlinkHref="//burjkhalifa.ae/en/" target="_blank">
            <rect className="news" x="1.54%" y="11.91%" width="11.25%" height="16.72%" />
          </a>
          <a xlinkHref="//burjkhalifa.ae/en/" target="_blank">
            <rect className="news" x="1.58%" y="28.77%" width="11.32%" height="13.14%" />
          </a> */}
        </svg>
      </div>
    );
  }
}
 
export default Newspage;