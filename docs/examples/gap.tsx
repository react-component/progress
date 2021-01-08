import * as React from 'react';
import { Circle, ProgressProps } from 'rc-progress';

const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];

function getColor(index) {
  return colorMap[(index + colorMap.length) % colorMap.length];
}

class Example extends React.Component<ProgressProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      percent: 30,
      colorIndex: 0,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    const value = parseInt((Math.random() * 100).toString(), 10);
    const colorIndex = parseInt((Math.random() * 3).toString(), 10);
    this.setState({
      percent: value,
      colorIndex,
    });
  }

  render() {
    const circleContainerStyle = {
      width: '200px',
      height: '200px',
    };
    const { percent, colorIndex } = this.state;
    const color = getColor(colorIndex);
    return (
      <div>
        <p>
          <button type="button" onClick={this.changeState}>
            Change State [{percent}]
          </button>
        </p>
        <div style={circleContainerStyle}>
          <Circle
            percent={percent}
            gapDegree={70}
            gapPosition="top"
            strokeWidth={6}
            strokeLinecap="square"
            strokeColor={color}
          />
        </div>
        <div style={circleContainerStyle}>
          <Circle
            percent={[percent / 3, percent / 3, percent / 3]}
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth={6}
            trailWidth={6}
            strokeLinecap="round"
            strokeColor={[color, getColor(colorIndex + 1), getColor(colorIndex + 2)]}
          />
        </div>

        <div style={circleContainerStyle}>
          <Circle
            percent={percent}
            gapDegree={70}
            gapPosition="left"
            strokeWidth={6}
            strokeLinecap="square"
            strokeColor={color}
          />
        </div>
        <div style={circleContainerStyle}>
          <Circle
            percent={percent}
            gapDegree={70}
            gapPosition="right"
            strokeWidth={6}
            strokeLinecap="square"
            strokeColor={color}
          />
        </div>
      </div>
    );
  }
}

export default Example;
