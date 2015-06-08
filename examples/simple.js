'use strict';

require('rc-progress/assets/index.css');
var Line = require('rc-progress').line;
var React = require('react');
var Example = React.createClass({
  getInitialState() {
    return {
      status: 'active', //success|failed|active
      percent: '0%',
      strokeWidth: 5
    }
  },
  changeState() {
    if(this.state.status === 'active'){
      this.setState({status: 'success'});
    }else if(this.state.status === 'success'){
      this.setState({status: 'failed'});
    }else if(this.state.status === 'failed'||!this.state.status){
      this.setState({status: 'active'});
    }
    this.setState({percent: parseInt(Math.random()*100)+'%'});
  },
  render() {
    var containerStyle = {
      "width": "250px"
    }
    return (
      <div>
        <div style={containerStyle}>
          <Line state={this.state.status} percent={this.state.percent} strokeWidth={this.state.strokeWidth} />
        </div>
        <p>
          <button onClick={this.changeState}>Change State</button>
        </p>
      </div>
      );
  }
})
React.render(<Example/>, document.getElementById('__react-content'));
