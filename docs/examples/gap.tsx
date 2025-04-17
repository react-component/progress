import React from 'react';
import { Circle } from '@rc-component/progress';
import type { ProgressProps } from '@rc-component/progress';

const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A', '#FF5959', '#BC3FFA'];

const circleContainerStyle: React.CSSProperties = {
  width: 200,
  height: 200,
};

function getColor(index: number) {
  return colorMap[(index + colorMap.length) % colorMap.length];
}

class Example extends React.Component<ProgressProps, any> {
  constructor(props: ProgressProps) {
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
    const { percent, colorIndex, subPathsCount } = this.state;
    const color = getColor(colorIndex);

    const multiPercentage = new Array(subPathsCount).fill(
      percent / subPathsCount,
      0,
      subPathsCount,
    );
    const multiPercentageStrokeColors = multiPercentage.map((_, i) => getColor(i));

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
            railWidth={6}
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
