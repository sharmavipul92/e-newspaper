import React, { Component } from 'react';
import '../css/news-page.css';
import { Carousel } from "react-responsive-carousel";
import { Link } from 'react-router-dom';

class Newspage extends Component {

  render() { 
    if(this.props.loading) {
      return <div>loading...</div>;
    } else if(!this.props.pages || !this.props.pages[this.props.activePage] || !this.props.pages[this.props.activePage].mainPage) {
      return <div>Some problem in fetching the page.</div>;
    }

    return (
      <Carousel
        showThumbs={false} 
        showIndicators={false}
        showStatus={false}
        selectedItem={this.props.activePage-1}
        swipeScrollTolerance={100}
        onChange={(e) => this.props.onCarouselPageChange(e)}
      >
      {
        Object.keys(this.props.pages).map(page => {
          return (
            <div key={page}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1142 1800" preserveAspectRatio="xMinYMin meet">
                <image width="1142" height="1800" xlinkHref={this.props.pages[page].mainPage}>
                </image>
                {
                  this.props.pages[page].news.map(snippet => {
                    if(!snippet.coordinates) return '';
                    let [x, y, width, height] = snippet.coordinates.split(',');
                    return (
                      <Link target="_blank" key={snippet.id} to={`/${this.props.startDate}/${this.props.activePage}/${snippet.id.split('/').pop().split('.')[0]}`}>
                        <rect className="news" x={x+'%'} y={y+'%'} width={width+'%'} height={height+'%'} />
                      </Link>
                    );
                  })
                }
              </svg>
            </div>
          );
        })
      }
      </Carousel>
    );
  }
}
 
export default Newspage;