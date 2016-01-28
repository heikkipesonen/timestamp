require('./view-section.scss');

import React from 'react';
import SwipePlane from './SwipePlane';

class ViewSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0
    };
  }

  onViewSwipe = (state) => {

    this.setState({
      x: state.x,
      y: state.y,
      animation: 0
    });
  };

  onViewSwipeEnd = () => {
    this.setState({
      x: 0,
      y: 0,
      animation: 200
    });
  };

  render() {
    let style = {
      height: window.innerHeight + 'px'
    };

    let containerStyle = {
      transform: `translate3d(0, ${this.state.y}px, 0)`,
      transitionDuration: (this.state.animation || 0) + 'ms',
      transitionTimingFunction: 'ease-out'
    };

    return (
      <div className="view-section" style={style}>
        <div className="view-section-title"><h3>{this.props.title}</h3></div>
        <div className="view-section-content" style={containerStyle}>
          {this.props.children}
          <SwipePlane onSwipe={this.onViewSwipe} onSwipeEnd={this.onViewSwipeEnd}></SwipePlane>
        </div>
      </div>
    );
  }
}

export default ViewSection;
