require('./calendar.scss');

import React from 'react';
import Week from './Week';
import {MONTH_NAMES, DAY_NAMES, Time} from '../Time';

class Month extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      calendar: []
    };
  }

  componentDidMount() {
    this.setMonth(this.props.model);
  }

  componentWillReceiveProps(nextProps) {
    this.setMonth(nextProps.model);

    this.setState({
      selectedDate: nextProps.selectedDate || null
    });
  }

  setMonth(model) {
    if (model === false || model === undefined) return;

    let calendar = Time.getCalendar(model);

    this.setState({
      monthName: MONTH_NAMES[model.getMonth()],
      calendar: calendar
    });
  }

  onDaySelect = (day) => {
    if (day !== false && this.props.onChange) {
      this.props.onChange(day);
    }
  };

  render() {
    return (
      <div className="month">
        <div className="month-header">
          <h2>{this.state.monthName}</h2>
        </div>
        <div className="weekdays">
          {Array(7).fill(0).map((k, index) => {
            return (<div className="day" key={index}>{DAY_NAMES[index]}</div>);
          })}
        </div>
        <div className="month-wrapper">
          {this.state.calendar.map((week, weekIndex) => {
            return (<Week model={week} selectedDate={this.props.model.getDate()} key={weekIndex} onClick={this.onDaySelect}></Week>);
          })}
        </div>
      </div>
    );
  }
}

export default Month;
