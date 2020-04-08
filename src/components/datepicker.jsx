import React, { Component } from 'react';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../css/datepicker.css';
import { InputGroup } from 'react-bootstrap';
import { FaRegCalendarAlt } from 'react-icons/fa';

class Datepicker extends Component {
  state = {
    isCalendarOpen: false
  };
 
  render() {
    return (
      <InputGroup className="row">
        <DatePicker
          ref={(c) => this._calendar = c}
          selected={this.props.startDate}
          maxDate={new Date()}
          minDate={new Date('2020/03/29')}
          popperPlacement="bottom-end"
          open={this.state.isCalendarOpen}
          onClickOutside={() => this.handleCalendarState(false)}
          onSelect={(date, e) => this.onDateSubmit(date, e.target.value)}
          dateFormat="dd/MM/yyyy"
        />
        <InputGroup.Append onClick={() => this.handleCalendarState(true)}>
          <InputGroup.Text>
            <label>
              <FaRegCalendarAlt />
            </label>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    );
  }

  onDateSubmit(date, dateStr) {
    // console.log(date, dateStr);
    this.setState({ isCalendarOpen: false });
    if(dateStr && this.isValidDate(dateStr)) {
      dateStr = dateStr.split('/').reverse().join('-');
      this.props.handleChange(new Date(dateStr));
    } else if(typeof dateStr === 'undefined') {
      this.props.handleChange(date);
    } else {

    }
  }

  isValidDate(dateStr) {
    let [date, month, year] = dateStr.split('/');
    if(date && date.length === 2 && month && month.length === 2 && year && year.length === 4) {
      return true;
    }
    return false;
  }

  handleCalendarState = (val) => {
    if(typeof val === 'boolean') {
      this.setState({ isCalendarOpen: val });
    } else {
      this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
    }
  }

  // openDatepicker = () => this._calendar.setOpen(true);
}
 
export default Datepicker;