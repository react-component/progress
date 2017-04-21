import 'rc-progress/assets/index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from 'rc-progress';

class App extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.increase();
  }

  increase() {
    const percent = this.state.percent + 1;
    if (percent >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 10);
  }

  restart() {
    clearTimeout(this.tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  }

  render() {
    return (
      <div style={{ margin: 10, width: 200 }}>
        <Circle strokeWidth="6" percent={this.state.percent} />
        <Line strokeWidth="4" percent={this.state.percent} />
        <button onClick={this.restart}>Restart</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
