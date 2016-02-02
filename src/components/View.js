import React from 'react';


class View extends React.Component {
  render() {
    let classNames = (this.props.className || '') + ' view';
    return (
      <div className={classNames}>{this.props.children}</div>
    );
  }
}

export default View;
