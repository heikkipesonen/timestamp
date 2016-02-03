require('./calendar.scss');

import React from 'react';
import Week from './Week';
import {MONTH_NAMES, DAY_NAMES, Time} from '../Time';

class Month extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      monthName: '',
      model: new Date(),
      calendar: [],
    };
  }

  componentDidMount() {
    let model = new Date(this.props.model ? this.props.model.getTime() : Date.now());
    this.setMonth(model);
  }

  componentWillReceiveProps(nextProps) {
    let model = new Date(nextProps.model.getTime());
    this.setMonth(model);
  }

  setMonth(model) {
    if (!model) {
      model = this.state.model;
    }

    this.setState({
      model: model,
      monthName: MONTH_NAMES[model.getMonth()],
      calendar: Time.getCalendar(model),
    });
  }

  onDaySelect = (day) => {
    console.log(day);
    if (day !== false && this.props.onChange) {
      this.props.onChange(day);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.model !== this.state.model;
  }

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
            return (<Week model={week} selectedDate={this.state.model.getDate()} key={weekIndex} onClick={this.onDaySelect}></Week>);
          })}
        </div>
      </div>
    );
  }
}

export default Month;
