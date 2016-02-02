import React from 'react';

class DragElement extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      direction: false, // current drag direction
      x: 0,
      y: 0,
      animation: 0, // current animation duration
      // speed of current event
      velocity:{
        x: 0,
        y: 0
      }
    };

    // last mouse event for calculating steps
    this.lastEvent = false;

    this.options = {
      max_x: 0,
      max_y: 100,
      min_x: 0,
      min_y: 0,

       // rubberband effect when out of bounds
      tension:{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      animationDuration: 300 // default animation duration
    };
  }

  setOptions(options) {
    for (let i in options) {
      this.options[i] = options[i];
    }
  }

  componentDidMount() {
    this.refs.dragElement.addEventListener('transitionend', this.animationEnd);
  }

  componentWillUnmount(){
    this.refs.dragElement.removeEventListener('transitionend', this.animationEnd);
  }

  /**
   * retrieve mouse or touch event from an event object
   * @param  {[type]} evt [description]
   * @return {[type]}     [description]
   */
  getCursor (evt) {
    if (evt.touches.length > 0){
      return { x:evt.touches[0].pageX, y:evt.touches[0].pageY, timeStamp:evt.timeStamp };
    } else {
      return { x:evt.pageX, y:evt.pageY, timeStamp:evt.timeStamp };
    }
  }


  /**
   * when drag is started, reset variables as needed
   * @param  {[type]} evt [description]
   * @return {[type]}     [description]
   */
  dragStart = (evt) => {
    evt.stopPropagation();

    this.setState({
      velocity:{
        x:0,
        y:0
      },
      direction: false
    });

    this.lastEvent = this.getCursor(evt);
  };


  /**
   * while dragging an element
   * @param  {[type]} evt [description]
   * @return {[type]}     [description]
   */
  dragMove = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    if (!this.lastEvent){
      this.dragStart(evt);
      return;
    }

    let currentPosition = this.getCursor(evt);

    let sx = currentPosition.x - this.lastEvent.x;
    let sy = currentPosition.y - this.lastEvent.y;
    let direction = this.state.direction;

    // if no direction is specified, decide the direction based on previous and current pointer position
    // so only one axis is available for movement at once
    if (!direction) {
      direction = Math.abs(sx) > Math.abs(sy) ? 'x' : 'y';
    }

    // if over bounds, apply tension
    if ((this.state.x + sx > this.options.max_x && sx > 0) || (this.state.x + sx < this.options.min_x && sx < 0)){
      sx = sx * (sx > 0 ? this.options.tension.left : this.options.tension.right);
    }

    if ((this.state.y + sy > this.options.max_y && sy > 0) || (this.state.y + sy < this.options.min_y && sy < 0)){
      sy = sy * (sy > 0 ? this.options.tension.bottom : this.options.tension.top);
    }


    // apply state
    this.setState({
      // velocity only if direction is known
      velocity: {
        x: direction === 'x' ? sx / (currentPosition.timeStamp - this.lastEvent.timeStamp) : 0,
        y: direction === 'y' ? sy / (currentPosition.timeStamp - this.lastEvent.timeStamp) : 0
      },
      animation: 0,

      // movement only if direction is known
      x: direction === 'x' ? Math.round(this.state.x + sx) : this.state.x,
      y: direction === 'y' ? Math.round(this.state.y + sy) : this.state.y,

      direction: direction
    });

    // add lastEvent
    this.lastEvent = currentPosition;
  };

  /**
   * @param  {[type]} evt [description]
   * @return {[type]}     [description]
   */
  dragEnd = (evt) => {
    evt.stopPropagation();

    // check if end position is within bounds
    // if not, apply animation to nearest position within bounds
    let dx = this.state.x > this.options.max_x ? this.options.max_x : this.state.x < this.options.min_x ? this.options.min_x : this.state.x;
    let dy = this.state.y > this.options.max_y ? this.options.max_y : this.state.y < this.options.min_y ? this.options.min_y : this.state.y;

    let animation = this.state.x === dx && this.state.y === dy ? 0 : this.options.animationDuration;

    this.setState({
      animation: animation,
      x: dx,
      y: dy,
      direction: false
    });

    this.lastEvent = false;
  };

  /**
   * move element to desired position
   * @param {Object} position  [description]
   * @param {int} animation [description]
   */
  setPosition(position, animation) {
    this.setState({
      x: position.x || 0,
      y: position.y || 0,
      animation: animation || 0
    });
  }

  /**
   * when element has stopped animating
   * @return {[type]} [description]
   */
  animationEnd = () => {
    if (this.props.onAnimationEnd){
      this.setState( this.props.onAnimationEnd(this.state, this.options) );
      return;
    }

    this.setState({
      animation: 0
    });
  };

  getClassNames(addititonalClassNames){
    let classNames = ['drag-view','view']

    if (this.props.className){
      classNames.push(this.props.className);
    }

    if (addititonalClassNames){
      classNames.push(addititonalClassNames);
    }

    if (this.state.y > this.options.max_y - this.options.classTolerance) {
      classNames.push('max-y');
    }

    if (this.state.y < this.options.min_y + this.options.classTolerance) {
      classNames.push('min-y');
    }

    return classNames.join(' ');
  }


  getElementStyle() {
    return {
      transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0)`,
      transitionDuration: `${this.state.animation}ms`,
      transitionTimingFunction: 'ease-out'
    };
  }

  render() {
    return (
      <div
        ref="dragElement"
        style={this.getElementStyle()}
        onTransitionEnd={this.animationEnd}
        onTouchStart={this.dragStart}
        onTouchMove={this.dragMove}
        onTouchEnd={this.dragEnd}

        className={this.getClassNames('drag-element')}>
        {this.props.children}
      </div>
    );
  }
}

export default DragElement;
