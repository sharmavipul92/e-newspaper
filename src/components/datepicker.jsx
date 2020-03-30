import React, { Component } from 'react';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../css/datepicker.css';

class Datepicker extends Component {
  state = {};
 
  render() {
    return (
      <DatePicker
        selected={this.props.startDate}
        onChange={(date) => this.props.handleChange(date)}
        maxDate={new Date()}
        popperPlacement="bottom-end"
      />
    );
  }
}
 
export default Datepicker;