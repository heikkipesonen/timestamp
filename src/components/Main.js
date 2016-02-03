require('normalize.css');
require('styles/App.scss');

import React from 'react';
import View from './View';
import DateSelect from './selectors/DateSelect';
import TimeSelect from './selectors/TimeSelect';
// import Motion from './Motion';
// import ViewSection from './ViewSection';
import Month from './calendar/Month';
import DragView from './DragView';
import Button from './Button';
import {Time} from './Time';
// import SwipePlane from './SwipePlane';

class AppComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      time: new Date()
    };
    this.viewOptions = {
      max_x: 0,
      max_y: window.innerHeight - 50,
      min_x: 0,
      min_y: 0,
      start_y: window.innerHeight -50,
      start_x: 0,
       // rubberband effect when out of bounds
      tension:{
        top: 0.3,
        left: 0,
        right: 0,
        bottom: 0.3
      },
      animationDuration: 300 // default animation duration
    };

    this.state.time.setMonth(0);
  }

  onDaySelect = (day) => {
    let model = new Date(this.state.time.getTime());
    model.setDate(day);

    this.setState({
      time: model
    });
  };

  timeChange = (time) => {
    console.log(time);
  };

  dayChange = (date) => {
    this.setState({
      time: new Date(date.getTime())
    });
  };

  render() {
    return (
      <View className="layout-column">
        <DateSelect label="Päiväys" onChange={this.dayChange} model={this.state.time}></DateSelect>
        <Month model={this.state.time} onChange={this.onDaySelect}></Month>

        <DragView options={this.viewOptions} className="view-z1">
          <div className="view-header"><h4>{Time.formatDate(this.state.time)}</h4></div>
          <TimeSelect label="Tunnit" onChange={this.timeChange}></TimeSelect>
          <div className="flex"></div>
          <div className="layout-row  layout-center">
            <Button label="Lisää"></Button>
          </div>
        </DragView>
      </View>
    );
  }
}

export default AppComponent;
