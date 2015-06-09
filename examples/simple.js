'use strict';

require('rc-progress/assets/index.css');
var Line = require('rc-progress').line;
var Circle = require('rc-progress').circle;
var React = require('react');
var Example = React.createClass({
  getInitialState() {
    return {
      percent: 30,
      color: "#3FC7FA"
    }
  },
  changeState() {
    var colorMap = ["#3FC7FA", "#85D262", "#FE8C6A"]
    this.setState({
      percent: parseInt(Math.random()*100),
      color: colorMap[parseInt(Math.random()*3)]
    });
  },
  render() {
    var containerStyle = {
      "width": "250px"
    }
    var circleContainerStyle = {
      "width": "250px",
      "height": "250px"
    }
    return (
      <div>
        <h3>Line Progress {this.state.percent}%</h3>
        <div style={containerStyle}>
          <Line percent={this.state.percent} strokeWidth="4" strokeColor={this.state.color} />
        </div>
        <h3>Circle Progress {this.state.percent}%</h3>
        <div style={circleContainerStyle}>
          <Circle percent={this.state.percent} strokeWidth="6" strokeColor={this.state.color} />
        </div>
        <p>
          <button onClick={this.changeState}>Change State</button>
        </p>
      </div>
      );
  }
})
React.render(<Example/>, document.getElementById('__react-content'));
