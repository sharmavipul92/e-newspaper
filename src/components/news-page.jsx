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
      this.fetchData();
    }
  }

  fetchData() {
    fetch(`http://localhost:8081/main/${this.formatDate(this.props.startDate)}/${this.props.activePage}`)
    .then(res => res.json())
    .then(({code, news, mainPage}) => {
      if(code === 200){
        this.setState({ news, mainPage, loading: false });
        this.myInit();
      } else {
        this.setState({loading: false});
      }
    })
    .catch(console.log)
  }

  formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  myLeave() {
    var canvas = document.getElementById('myCanvas');
    this.state.hdc.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawRect(e, coOrdStr) {
    console.log(`coords: ${coOrdStr}`);
    var mCoords = coOrdStr.split(',');
    var top, left, bot, right;
    left = mCoords[0];
    top = mCoords[1];
    right = mCoords[2];
    bot = mCoords[3];
    this.state.hdc.strokeRect(left,top,right-left,bot-top); 
  }

  myInit() {
    // get the target image
    var img = this.myRef.current;

    let {x, y} = img.getBoundingClientRect()
    let w = img.clientWidth;
    let h = img.clientHeight;

    // move the canvas, so it's contained by the same parent as the image
    var imgParent = img.parentNode;
    var can = document.getElementById('myCanvas');
    imgParent.appendChild(can);

    // place the canvas in front of the image
    can.style.zIndex = 1;

    // position it over the image
    can.style.left = x+'px';
    can.style.top = y+'px';

    // make same size as the image
    can.setAttribute('width', w+'px');
    can.setAttribute('height', h+'px');

    // get it's context
    let context = can.getContext('2d');

    // set the 'default' values for the colour/width of fill/stroke operations
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    this.setState({hdc: context});
  }

  render() { 
    if(this.state.loading) {
      return <div>loading...</div>;
    } else if(!this.state.mainPage) {
      return <div>Some problem in fetching the page.</div>;
    }
    return (
      <div>
        <canvas id='myCanvas'></canvas>
        <img ref={this.myRef} className='mw-100' src={this.state.mainPage} alt="Workplace" useMap="#workmap"/>

        <map name="workmap">
          {/* <area id="area1" key={this.state.news[0].id} shape="rect" target="_blank" coords="206,192,1095,850" alt="Computer" href={this.state.news[0].link}/> */}
          {this.state.news.map(snippet => (
            <area key={snippet.id} shape="rect" target="_blank" onMouseOver={e => this.drawRect(e, snippet.coordinates)} onMouseOut={e => this.myLeave(e)} coords={snippet.coordinates} alt="Computer" href={snippet.link}/>
          ))}
        </map>
      </div>
    );
  }
}
 
export default Newspage;