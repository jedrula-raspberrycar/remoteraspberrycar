import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="range" onInput={this.inputEvent.bind(this)} />
      </div>
    );
  }

  inputEvent({ target: { value } }) {
    this.props.changeSpeed(value);
  }
}

export default App;
