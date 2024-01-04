import * as React from 'react';
import { Circle, type ProgressProps } from 'rc-progress';

const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A', '#FF5959', '#BC3FFA'];

function getColor(index) {
  return colorMap[(index + colorMap.length) % colorMap.length];
}

class Example extends React.Component<ProgressProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      percent: 100,
      colorIndex: 0,
      subPathsCount: 3,
    };
    this.changeState = this.changeState.bind(this);
    this.changeCount = this.changeCount.bind(this);
  }

  changeState() {
    const value = parseInt((Math.random() * 100).toString(), 10);
    const colorIndex = parseInt((Math.random() * 3).toString(), 10);
    this.setState({
      percent: value,
      colorIndex,
    });
  }

  changeCount() {
    this.setState({
      ...this.state,
      subPathsCount: (this.state.subPathsCount % 6) + 1,
    });
  }

  render() {
    const circleContainerStyle = {
      width: '200px',
      height: '200px',
    };
    const { percent, colorIndex, subPathsCount } = this.state;
    const color = getColor(colorIndex);

    const multiPercentage = new Array(subPathsCount).fill(
      percent / subPathsCount,
      0,
      subPathsCount,
    );
    const multiPercentageStrokeColors = multiPercentage.map((v, index) => getColor(index));

    return (
      <div>
        <p>
          <button type="button" onClick={this.changeState}>
            Change State [{percent}]
          </button>

          <button type="button" onClick={this.changeCount}>
            Change Count [{subPathsCount}]
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
            percent={multiPercentage}
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth={6}
            trailWidth={6}
            strokeLinecap="round"
            strokeColor={multiPercentageStrokeColors}
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
        <div style={circleContainerStyle}>
          <Circle
            percent={percent}
            gapDegree={70}
            strokeWidth={6}
            strokeColor={{
              '0%': 'red',
              '99%': 'blue',
              '100%': 'green',
            }}
          />
        </div>
      </div>
    );
  }
}

export default Example;
