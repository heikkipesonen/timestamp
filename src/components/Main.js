require('normalize.css');
require('styles/App.scss');

import React from 'react';
import View from './View';
import DateSelect from './selectors/DateSelect';
import TimeSelect from './selectors/TimeSelect';
// import Motion from './Motion';
// import ViewSection from './ViewSection';
// import Month from './calendar/Month';
import DragView from './DragView';
import Button from './Button';
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

  dayChange = (date) => {
    this.setState({
      time: date
    });
  };

  render() {
    return (
      <View className="layout-column layout-center">
        <DateSelect label="Päiväys" onChange={this.dayChange} model={this.state.time}></DateSelect>
        <TimeSelect label="Tunnit" model={this.state.time}></TimeSelect>
        <div className="flex"></div>
        <div className="layout-row">
          <Button label="Lisää"></Button>
        </div>
      </View>
    );
  }
}

export default AppComponent;
