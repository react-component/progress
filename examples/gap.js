import 'rc-progress/assets/index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Circle } from 'rc-progress';

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
    const circleContainerStyle = {
      width: '200px',
      height: '200px',
    };
    return (
      <div>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            gapDegree={70}
            gapPosition="top"
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={this.state.color}
          />
        </div>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={this.state.color}
          />
        </div>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            gapDegree={70}
            gapPosition="left"
            strokeWidth="6"
            strokeLinecap="square"
            strokeColor={this.state.color}
          />
        </div>
        <div style={circleContainerStyle}>
          <Circle
            percent={this.state.percent}
            gapDegree={70}
            gapPosition="right"
            strokeWidth="6"
            strokeLinecap="square"
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
