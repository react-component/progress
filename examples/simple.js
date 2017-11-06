import 'rc-progress/assets/index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from 'rc-progress';

class Example extends Component {
  constructor() {
    super();
    this.state = {
      percent: 30,
      color: '#3FC7FA',
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    const value = parseInt(Math.random() * 100, 10);
    this.setState({
      percent: value,
      color: colorMap[parseInt(Math.random() * 3, 10)],
    });
  }

  render() {
    const containerStyle = {
      width: '250px',
    };
    const circleContainerStyle = {
      width: '250px',
      height: '250px',
      display: 'inline-block',
    };
    return (
      <div>
        <h3>Line Progress {this.state.percent}%</h3>
        <div style={containerStyle}>
          <Line percent={this.state.percent} strokeWidth="4" strokeColor={this.state.color} />
        </div>
        <h3>Circle Progress {this.state.percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeColor={this.state.color}
          />
        </div>
        <p>
          <button onClick={this.changeState}>Change State</button>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('__react-content'));
