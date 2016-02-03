import React from 'react';

class Day extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.selected !== this.props.selected || nextProps.day !== this.props.day;
  }

  render() {    
    let classNames = 'day';

    if (this.props.selected === true) {
      classNames += ' selected';
    }

    return (
      <div className={classNames} onClick={()=>this.props.onClick(this.props.day)}>
        <span>{this.props.day}</span>
      </div>
    );
  }
}

export default Day;
