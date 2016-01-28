import React from 'react';

class Week extends React.Component {
  render() {
    return (
      <div className="week">
      {this.props.model.map((day, dayIndex) => {
        let classNames = 'day';

        if (this.props.selectedDate === day) {
          classNames += ' selected';
        }
        return (
          <div className={classNames} key={dayIndex} onClick={()=>this.props.onClick(day)}>
            <span>{day}</span>
          </div>
        );
      })}
      </div>
    );
  }
}

export default Week;
