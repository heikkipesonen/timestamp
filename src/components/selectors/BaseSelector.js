require('./date-select.scss');

import SwipePlane from '../SwipePlane';
import React from 'react';

class BaseSelector extends SwipePlane{
  constructor(props) {
    super(props);
    this.options = {};

    this.offset = {
      x: 0,
      y: 0
    };
  }

  setOptions(options) {
    for (let i in options) {
      this.options[i] = options[i];
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      this.setState({
        model: nextProps.model
      });
    }
  }

  /**
   * update only when display string changes
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.getDisplayString(nextState.model) !== this.getDisplayString();
  }

  /**
   * parse date to string
   * @return {[type]} [description]
   */
  getDisplayString(model) {
    if (!model){
      model = this.state.model;
    }
    return model;
  }

  render() {
    return (
      <div className="time-picker" ref="swipePlane">
        <label className="time-picker-label">{this.props.label || ''}</label>
        <h3>{this.getDisplayString()}</h3>
      </div>
    );
  }
}

export default BaseSelector;
