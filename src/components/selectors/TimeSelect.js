require('./date-select.scss');

import SwipePlane from '../SwipePlane';
import React from 'react';


class TimeSelect extends SwipePlane{
  constructor(props) {
    super(props);

    this.state.model = 0;
    this.state.m = 0;
    this.state.h = 0;

    this.state.displayTime = this.getDisplayTime();
    this.options = {
      axis_minutes: 'x',
      axis_hours: 'y',
      threshold_minutes: 40,
      threshold_hours: 40,
      min: 0,
      max: 7.5 * 60
    };

    this.offset = {
      x: 0,
      y: 0
    };
  }

  onSwipeMove(state) {
    this.offset.x += state.step_x ? state.step_x : 0;
    this.offset.y += state.step_y ? state.step_y : 0;


    let offsetHours = 0,
        offsetMinutes = 0;

    if (state.direction === this.options.axis_minutes && Math.abs(this.offset[this.options.axis_minutes]) > this.options.threshold_minutes){
      offsetMinutes = this.offset[this.options.axis_minutes] < 0 ? -1 : 1;
    }
    if (state.direction === this.options.axis_hours && Math.abs(this.offset[this.options.axis_hours]) > this.options.threshold_hours){
      offsetHours = this.offset[this.options.axis_hours] < 0 ? -1 : 1;
    }

    if (Math.abs(offsetMinutes) > 0 || Math.abs(offsetHours) > 0){

      this.offset.y = 0;
      this.offset.x = 0;
      let newModelTime = this.state.model + offsetHours*60 + offsetMinutes * 15;
          newModelTime = newModelTime > this.options.max ? this.options.max : newModelTime < this.options.min ? this.options.min : newModelTime;

      let newState = {
        model: newModelTime
      };

      if (this.props.onChange){
        this.props.onChange(newState.model);
      }

      this.setState(newState);
    }
  }

  /**
   * update only when display string changes
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.model !== this.state.model;
  }

  /**
   * parse date to string
   * @return {[type]} [description]
   */
  getDisplayTime() {
    let hours = ('0'+ Math.floor(this.state.model / 60)).slice(-2);
    let minutes = ('0' + (this.state.model % 60)).slice(-2);

    return `${hours}:${minutes}`;
  }

  render() {
    return (
      <div className="time-picker time-select" ref="swipePlane">
        <label className="time-picker-label">{this.props.label || ''}</label>
        <h1>{this.getDisplayTime()}</h1>
      </div>
    );
  }
}

export default TimeSelect;
