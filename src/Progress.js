'use strict';

var React = require('react');
var rcUtil = require('rc-util');
var Line = React.createClass({
  getInitialState() {
    return {
      percent: 0,
      text: "0%"
    }
  },
  componentDidMount() {

  },
  componentWillUnmount() {

  },
  render() {
    var style = {
      "stroke-dasharray": "100px, 100px",
      "stroke-dashoffset": "60px"
    }
    var trailStyle = {
      "stroke-dasharray": "100px, 100px",
      "stroke-dashoffset": "0px"
    }

    var strokeWidth = this.props.strokeWidth
    var pathString = render("M {center},{center} L {right},{center}", {
      center: strokeWidth/2
    });
    pathString = render(pathString, {
      right: (100-strokeWidth/2)
    });
    var viewBoxString = render("0 0 100 {strokeWidth}", {
      strokeWidth: strokeWidth
    })


    var _this = this;
    var defaultProps = {
      strokeWidth: 1,
      strokeColor: "#3FC7FA",
      trailWidth: 1,
      trailColor: "#D9D9D9",
      fill: null
    };
    ["strokeWidth", "strokeColor", "trailWidth", "trailColor", "fill"].forEach(function(item, i, arr){
      if(item === 'trailWidth'
        && !_this.props.trailWidth
        && _this.props.strokeWidth){
        _this.props.trailWidth = _this.props.strokeWidth;
        return
      }
      if(!_this.props[item]){
        _this.props[item] = defaultProps[item]
      }
    })

    console.log(this.props)

    return (
      <svg class="ant-progress-line" viewBox={viewBoxString} preserveAspectRatio="none">
        <g>
          <path class="ant-progress-line-trail" d={pathString} strokeLinecap="round" stroke={this.props.trailColor} strokeWidth={this.props.trailWidth} fillOpacity="0" style={trailStyle}></path>
          <path class="ant-progress-line-path" d={pathString} strokeLinecap="round" stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} fillOpacity="0" style={style}></path>
        </g>
      </svg>
    );
  }
});
module.exports = {
  line: Line,
  //circle: Circle
};


// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
  var rendered = template;

  for (var key in vars) {
    if (vars.hasOwnProperty(key)) {
      var val = vars[key];
      var regExpString = '\\{' + key + '\\}';
      var regExp = new RegExp(regExpString, 'g');

      rendered = rendered.replace(regExp, val);
    }
  }

  return rendered;
}

