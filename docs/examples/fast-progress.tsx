import * as React from 'react';
import { Line, Circle, ProgressProps } from 'rc-progress';

class App extends React.Component<ProgressProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
    this.restart = this.restart.bind(this);
  }

  private tm: number;

  componentDidMount() {
    this.increase();
  }

  increase() {
    const { percent } = this.state;
    const newPercent = percent + 1;
    if (newPercent >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent: newPercent });
    this.tm = setTimeout(this.increase, 10);
  }

  restart() {
    clearTimeout(this.tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  }

  render() {
    const { percent } = this.state;
    return (
      <div style={{ margin: 10, width: 200 }}>
        <Circle strokeWidth={6} percent={percent} />
        <Line strokeWidth={4} percent={percent} />
        <button type="button" onClick={this.restart}>
          Restart
        </button>
      </div>
    );
  }
}

export default App;
