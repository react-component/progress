import React from 'react';
import { Line, Circle } from '@rc-component/progress';
import type { ProgressProps } from '@rc-component/progress';

class Example extends React.Component<ProgressProps, any> {
  constructor(props: ProgressProps) {
    super(props);
    this.state = {
      percent: 9,
      color: '#3FC7FA',
    };
    this.changeState = this.changeState.bind(this);
    this.changeIncrease = this.changeIncrease.bind(this);
    this.changeReduce = this.changeReduce.bind(this);
  }

  changeState() {
    const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    const value = parseInt((Math.random() * 100).toString(), 10);
    this.setState({
      percent: value,
      color: colorMap[parseInt((Math.random() * 3).toString(), 10)],
    });
  }

  changeIncrease() {
    this.setState(({ percent }) => {
      if (percent > 100) {
        return {
          percent: 100,
        };
      }
      return {
        percent: percent + 1,
      };
    });
  }

  changeReduce() {
    this.setState(({ percent }) => {
      if (percent < 0) {
        return {
          percent: 0,
        };
      }
      return {
        percent: percent - 1,
      };
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
          <Line percent={percent} strokeWidth={4} strokeColor={color} />
          <Line
            percent={[percent / 2, percent / 2]}
            strokeWidth={4}
            strokeColor={[color, '#CCC']}
          />
        </div>
        <h3>Circle Progress {percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle percent={percent} strokeWidth={6} strokeLinecap="round" strokeColor={color} />
        </div>
        <div style={circleContainerStyle}>
          <Circle percent={percent} strokeWidth={6} strokeLinecap="butt" strokeColor={color} />
        </div>
        <div style={circleContainerStyle}>
          <Circle percent={percent} strokeWidth={6} strokeLinecap="square" strokeColor={color} />
        </div>
        <p>
          <button type="button" onClick={this.changeState}>
            Change State
          </button>
          <button type="button" onClick={this.changeIncrease}>
            Increase
          </button>
          <button type="button" onClick={this.changeReduce}>
            Reduce
          </button>
        </p>
      </div>
    );
  }
}

export default Example;
