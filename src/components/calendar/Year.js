require('./calendar.scss');

import React from 'react';
import Month from './Month';


class Year extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      year: []
    };
  }

  componentDidMount() {
    this.buildYear(this.props.model);
  }

  buildYear() {
    let year = Array(12).fill(0).map((k,i) => i);
    console.log(year);
    this.setState({
      year: year
    });
  }

  render() {
    return (
      <div className="year">
        <div className="year-title">
          <h2>{this.props.model}</h2>
        </div>
        {this.state.year.map((monthNumber, index)=>{
          let model = new Date();
              model.setMonth(monthNumber);

          return (<Month model={model} key={index}></Month>);
        })}
      </div>
    );
  }
}

export default Year;
