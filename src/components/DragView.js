import React from 'react';
import DragElement from './DragElement';

class DragView extends DragElement{

    constructor(props) {
      super(props);

      this.setOptions({
        classTolerance: 50,
        changeVelocity: 0.2
      });

      if (this.props.options) {
        this.setOptions(this.props.options);
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.options) {
        this.setOptions(nextProps.options);
      }
    }
    /**
     * on drag end
     * @param  {[type]} evt [description]
     * @return {[type]}     [description]
     */
    dragEnd = (evt) => {
      if (!this.lastEvent) return;

      evt.stopPropagation();

      // distance to max and min positions
      let distToMax = Math.abs(this.options.max_y - this.state.y);
      let distToMin = Math.abs(this.state.y - this.options.min_y);

      // decide which is closer and then apply that as next position
      let dx = 0;
      let dy = distToMin < distToMax ? this.options.min_y : this.options.max_y;

      // apply animation
      let animation = this.state.x === dx && this.state.y === dy ? 0 : this.options.animationDuration;
      let newState = {
        animation: animation,
        x: dx,
        y: dy,
        direction: false
      };
      // determine if velocity is over the change threshold,
      // if so, then goto next position
      if (this.state.velocity.y > this.options.changeVelocity){
        newState.y = this.options.max_y;
      }

      if (this.state.velocity.y < -this.options.changeVelocity){
        newState.y = this.options.min_y;
      }

      this.setState(newState);

      this.lastEvent = false;
      this._dragStarted = false;
    };

    render(){
      return (
        <div
          ref="dragElement"
          style={this.getElementStyle()}
          className={this.getClassNames()}>
          {this.props.children}
        </div>
      );
    }
}

export default DragView;
