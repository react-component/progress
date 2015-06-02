'use strict';

var React = require('react');
var rcUtil = require('rc-util');
var Progress = React.createClass({
  render() {
    var classes = rcUtil.classSet({
      'rc-progress': true,
      'rc-progress-success': (this.props.state === 'success'),
      'rc-progress-active': (this.props.state === 'active'),
      'rc-progress-failed': (this.props.state === 'failed')
    });
    var percentWidth = {
      width: this.props.percent
    };
    return (
      <div className={classes} >
        <div className="rc-progress-title">{this.props.title}</div>
        <div className="rc-progress-bg">
          <div className="rc-progress-bar" style={percentWidth}></div>
        </div>
        <div className="rc-progress-percent">{this.props.percent}</div>
      </div>
    );
  }
});
module.exports = Progress;
