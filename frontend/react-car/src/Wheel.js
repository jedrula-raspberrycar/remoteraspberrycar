import React, { Component } from 'react';
import './App.css';
class App extends Component {
  render() {
    return (
      <input
        value={this.props.speed}
        type="range"
        onInput={(event) => this.props.changeSpeed(event.target.value)}
        onMouseUp={this.props.changeSpeed.bind(this, 50)}
        readOnly="true"
      />
    );
  }
}

export default App;
