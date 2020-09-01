import React, { Component } from 'react';
import { Line, Circle } from '../src';

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
    const { percent, color } = this.state;
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
        <h3>Line Progress {percent}%</h3>
        <div style={containerStyle}>
          <Line percent={percent} strokeWidth="4" strokeColor={color} />
          <Line
            percent={[percent / 2, percent / 2]}
            strokeWidth="4"
            strokeColor={[color, '#CCC']}
          />
        </div>
        <h3>Circle Progress {percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle percent={percent} strokeWidth="6" strokeLinecap="round" strokeColor={color} />
        </div>
        <p>
          <button type="button" onClick={this.changeState}>
            Change State
          </button>
        </p>
      </div>
    );
  }
}

export default Example;
