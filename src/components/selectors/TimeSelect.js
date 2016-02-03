import BaseSelector from './BaseSelector';
import {Time} from '../Time';

class TimeSelect extends BaseSelector{
  constructor(props) {
    super(props);
    this.state.model = 0;

    this.setOptions({
      min: 0,
      max: 7.5 * 60,
      axis_minutes: 'x',
      axis_hours: 'y',
      threshold_hours: 40,
      threshold_minutes: 40
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.model !== nextState.model;
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
   * parse date to string
   * @return {[type]} [description]
   */
  getDisplayString() {
    return Time.formatMinutes(this.state.model);
  }
}

export default TimeSelect;
