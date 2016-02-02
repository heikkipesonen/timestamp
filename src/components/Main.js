require('normalize.css');
require('styles/App.scss');

import React from 'react';
import View from './View';
import DateSelect from './DateSelect';
// import Motion from './Motion';
// import ViewSection from './ViewSection';
import Month from './calendar/Month';

import SwipePlane from './SwipePlane';

class AppComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      time: new Date()
    };

    this.state.time.setMonth(0);

    this.lastPosition
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
      <View>
        <DateSelect onChange={this.dayChange} model={this.state.time}></DateSelect>
        <Month onChange={this.onDaySelect} model={this.state.time}></Month>
      </View>
    );
  }
}

export default AppComponent;
