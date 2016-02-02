require('./button.scss');

import React from 'react';

class Landing extends React.Component {
  render() {
    let classNames = this.props.className ? this.props.className + ' button' : 'button';
    return (
      <button className={classNames} onClick={this.props.onClick}>{this.props.label}</button>
    );
  }
}

export default Landing;
