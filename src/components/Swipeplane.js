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
      dxratio: 0,
      dyratio: 0,
      direction: false
    };

    this.lastEvent = {
      direction: false,
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    this.refs.swipePlane.addEventListener('touchstart', this.touchStart);
    this.refs.swipePlane.addEventListener('touchmove', this.touchMove);
    this.refs.swipePlane.addEventListener('touchend', this.touchEnd);

    this.setState({
      width: this.refs.swipePlane.offsetWidth,
      height: this.refs.swipePlane.offsetHeight
    });
  }

  componentWillUnmount() {
    this.refs.swipePlane.removeEventListener('touchstart', this.touchStart);
    this.refs.swipePlane.removeEventListener('touchmove', this.touchMove);
    this.refs.swipePlane.removeEventListener('touchend', this.touchEnd);
  }

  touchStart = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    this.lastEvent.x = evt.touches[0].pageX;
    this.lastEvent.y = evt.touches[0].pageY;
    this.lastEvent.direction = false;

    this.setState({
      step_x: 0,
      step_y: 0,
      dx: 0,
      dy: 0,
      x: 0,
      y: 0
    });
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

    let newState = {
      direction: direction,
      step_x: dx,
      step_y: dy,
      x: this.state.x += dx,
      y: this.state.y += dy,
      dx: dx,
      dy: dy
    };

    this.setState(newState);

    if (this.onSwipeMove){
      this.onSwipeMove(newState);
    }

    this.lastEvent.direction = direction;
    this.lastEvent.x = evt.touches[0].pageX;
    this.lastEvent.y = evt.touches[0].pageY;
  };

  touchEnd = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      step_x: 0,
      step_y: 0,
      dx: 0,
      dy: 0,
      x: 0,
      y: 0
    });

    if (this.onSwipeEnd){
      this.onSwipeEnd(this.state);
    }
  };

  render() {
    return (
      <div
        ref="swipePlane"
        className="swipe-plane">
      </div>
    );
  }
}

export default SwipePlane;
