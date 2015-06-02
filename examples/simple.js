'use strict';

require('rc-progress/assets/index.css');
var Progress = require('rc-progress');
var React = require('react');
var Example = React.createClass({
  getInitialState() {
    return {
      status: 'active', //success|failed|active
      percent: '0%'
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
    return (
      <div>
        <Progress state={this.state.status} percent={this.state.percent} title="进度" />
        <p>
          <button onClick={this.changeState}>Change State</button>
        </p>
      </div>
      );
  }
})
React.render(<Example/>, document.getElementById('__react-content'));
