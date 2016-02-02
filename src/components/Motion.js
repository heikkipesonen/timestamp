import React from 'react';

class Motion extends React.Component{
  constructor(props) {
    super(props);

    this.state = {};
    this.events = new deviceMotion();
  }

  componentDidMount(){

  }

  render(){
    return (
      <div>
        <p>{this.state.ax} : {this.state.ay} : {this.state.az}</p>
        <p>{this.state.arAlpha} : {this.state.arBeta} : {this.state.arGamma}</p>
      </div>
    );
  }
}

export default Motion;
