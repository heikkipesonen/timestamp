require('normalize.css');
require('styles/App.scss');

import React from 'react';
import View from './View';
// import ViewSection from './ViewSection';
// import Month from './calendar/Month';

import SwipePlane from './SwipePlane';

class AppComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    // annyang.addCommands({
    //   'die': () => { alert('joni likes poni'); },
    //   'daniel is god': () => { alert('ALL HEIL D'); }
    // });
    //
    // annyang.start();
    // console.log(window.annyang);
  }

  onDaySelect = (day) => {

      this.state.time.setDate(day);

      this.setState({
        time: new Date( this.state.time.getTime() )
      });
  };

  onSwipeEnd = (state) => {
    console.log(state);
  };

  render() {
    return (
      <View>
        <SwipePlane onSwipeEnd={this.onSwipeEnd}></SwipePlane>
      </View>
    );
  }
}

export default AppComponent;
