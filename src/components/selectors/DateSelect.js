import BaseSelector from './BaseSelector';
import {Time} from '../Time';

class DateSelect extends BaseSelector{
  constructor(props) {
    super(props);

    this.setOptions({
      axis_days: 'x',
      axis_months: 'y',
      threshold_months: 40,
      threshold_days: 40
    });

    this.state.model = this.props.model || new Date();
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
   * parse date to string
   * @return {[type]} [description]
   */
  getDisplayString(model) {
    if (!model) {
      model = this.state.model;
    }
    return Time.formatDate(model);
  }
}

export default DateSelect;
