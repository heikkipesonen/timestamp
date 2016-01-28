require('./swipe-plane.scss');

import React from 'react';

class SwipePlane extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      xratio: 0,
      yratio: 0,
      direction: false
    };

    this.lastEvent = {
      direction: false,
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    this.setState({
      width: this.refs.swipePlane.offsetWidth,
      height: this.refs.swipePlane.offsetHeight
    });
  }

  touchStart = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    this.lastEvent.x = evt.touches[0].pageX;
    this.lastEvent.y = evt.touches[0].pageY;
    this.lastEvent.direction = false;

    if (this.props.onSwipeStart){
      this.props.onSwipeStart(this.state);
    }
  };

  touchMove = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    let dx = evt.touches[0].pageX - this.lastEvent.x;
    let dy = evt.touches[0].pageY - this.lastEvent.y;
    let direction = this.lastEvent.direction;

    if (!this.state.direction) {
      if (Math.abs(dx) > Math.abs(dy)){
        direction = 'x';
      } else {
        direction = 'y';
      }
    }

    if (direction === 'x'){
      dy = 0;
    } else if (direction === 'y') {
      dx = 0;
    }

    this.setState({
      direction: direction,
      x: this.state.x += dx,
      y: this.state.y += dy,
      xratio:  (this.state.x + dx) / this.state.width,
      yratio:  (this.state.y + dy) / this.state.height
    });

    if (this.props.onSwipe){
      this.props.onSwipe(this.state);
    }

    this.lastEvent.direction = direction;
    this.lastEvent.x = evt.touches[0].pageX;
    this.lastEvent.y = evt.touches[0].pageY;
  };

  touchEnd = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    if (this.props.onSwipeEnd){
      this.props.onSwipeEnd(this.state);
    }

    this.setState({
      x: 0,
      y: 0
    });
  };

  render() {
    return (
      <div
        ref="swipePlane"
        className="swipe-plane"
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}>
      </div>
    );
  }
}

export default SwipePlane;
