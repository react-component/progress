import 'rc-progress/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from 'rc-progress';

let tm;

const App = React.createClass({
  getInitialState() {
    return {
      percent: 0,
    };
  },
  componentDidMount() {
    this.increase();
  },
  increase() {
    let percent = this.state.percent + 1;
    if (percent > 100) {
      percent = 100;
      clearTimeout(tm);
      return;
    }
    this.setState({ percent });
    tm = setTimeout(this.increase, 10);
  },
  restart() {
    clearTimeout(tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  },
  render() {
    return (
      <div style={{ margin: 10, width: 200 }}>
        <Circle strokeWidth="6" percent={this.state.percent} />
        <Line strokeWidth="4" percent={this.state.percent} />
        <button onClick={this.restart}>Restart</button>
      </div>
    );
  },
});

ReactDOM.render(<App />, document.getElementById('__react-content'));
