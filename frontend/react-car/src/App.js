import React, { Component } from 'react';
import './App.css';
import WheelComponent from './Wheel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WheelComponent changeSpeed={this.changeSpeed.bind(this, 'left')} />
        <WheelComponent changeSpeed={this.changeSpeed.bind(this, 'right')} />
      </div>
    );
  }

  changeSpeed(wheelId, speed) {
    console.log(wheelId, speed);
  }
}

export default App;
