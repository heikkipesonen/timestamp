import React from 'react';
import Day from './Day';

class Week extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.model.join('') !== this.props.model.join('') || nextProps.selectedDate !== this.props.selectedDate;
  }

  render() {
    return (
      <div className="week">
        {this.props.model.map((day, dayIndex) => {
          return (
            <Day
              key={dayIndex}
              onClick={()=>this.props.onClick(day)}
              selected={day === this.props.selectedDate}
              day={day}>
            </Day>
          );
        })}
      </div>
    );
  }
}

export default Week;
