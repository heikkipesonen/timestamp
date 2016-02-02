require('./date-select.scss');

import SwipePlane from '../SwipePlane';
import React from 'react';

class DateSelect extends SwipePlane{
  constructor(props) {
    super(props);

    this.state.model = this.props.model || new Date();
    this.state.displayDate = this.getDisplayDate();

    this.options = {
      axis_days: 'x',
      axis_months: 'y',
      threshold_months: 40,
      threshold_days: 40
    };
    this.offset = {
      x: 0,
      y: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      this.setState({
        model: nextProps.model
      });
    }
  }

  onSwipeMove(state) {
    /**
     * set offset on both axis
     * @type {Number}
     */
    this.offset.x += state.step_x ? state.step_x : 0;
    this.offset.y += state.step_y ? state.step_y : 0;

    let update = false;
    let model = new Date(this.state.model.getTime())

    // if change is greater than zero, then update the
    // date model
    if (Math.abs(this.offset[this.options.axis_months]) > this.options.threshold_months){
      model.setMonth(this.state.model.getMonth() + (this.offset[this.options.axis_months] < 0 ? -1 : 1));
      update = true;
    }

    if (Math.abs(this.offset[this.options.axis_days]) > this.options.threshold_days){
      let time = (this.offset[this.options.axis_days] < 0 ? -1 : 1) * 1000 * 60 * 60 * 24;
      model.setTime(model.getTime() + time);
      update = true;
    }

    if (update) {
      this.offset.x = 0;
      this.offset.y = 0;

      this.setState({
        model: model
      });

      if (this.props.onChange){
        this.props.onChange(this.state.model);
      }
    }
  }

  /**
   * update only when display string changes
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.model.getTime() !== this.state.model.getTime();
  }

  /**
   * parse date to string
   * @return {[type]} [description]
   */
  getDisplayDate(model) {
    if (!model) {
      model = this.state.model;
    }

    let day = '0' + model.getDate();
    let month = '0' + (model.getMonth() +1);
    return day.slice(-2) + '.' + month.slice(-2) + '.' + model.getFullYear();
  }

  render() {
    return (
      <div className="time-picker date-select" ref="swipePlane">
        <label className="time-picker-label">{this.props.label || ''}</label>
        <h1>{this.getDisplayDate()}</h1>
      </div>
    );
  }
}

export default DateSelect;
