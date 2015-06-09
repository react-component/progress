'use strict';

var React = require('react');
var rcUtil = require('rc-util');
var Line = React.createClass({
  render() {
    var pathStyle = {
      "stroke-dasharray": "100px, 100px",
      "stroke-dashoffset": (100-this.props.percent) + "px",
      "transition": "stroke-dashoffset 0.6s ease 0s, stroke 0.6s linear"
    }
    var trailStyle = {
      "stroke-dasharray": "100px, 100px",
      "stroke-dashoffset": "0px"
    }

    var _this = this;
    var defaultProps = {
      strokeWidth: 1,
      strokeColor: "#3FC7FA",
      trailWidth: 1,
      trailColor: "#D9D9D9"
    };
    ["strokeWidth", "strokeColor", "trailWidth", "trailColor"].forEach(function(item, i, arr){
      if(item === 'trailWidth'
        && !_this.props.trailWidth
        && _this.props.strokeWidth){
        _this.props.trailWidth = _this.props.strokeWidth;
        return
      }
      if(item === 'strokeWidth'
        &&_this.props.strokeWidth
        &&(!parseFloat(_this.props.strokeWidth)
        ||parseFloat(_this.props.strokeWidth)>100
        ||parseFloat(_this.props.strokeWidth)<0)
        ){
        _this.props[item] = defaultProps[item]
        return
      }
      if(!_this.props[item]){
        _this.props[item] = defaultProps[item]
      }
    })

    var strokeWidth = this.props.strokeWidth
    var pathString = render("M {center},{center} L {right},{center}", {
      center: strokeWidth/2,
      right: (100-strokeWidth/2)
    });
    var viewBoxString = render("0 0 100 {strokeWidth}", {
      strokeWidth: strokeWidth
    })

    return (
      <svg class="rc-progress-line" viewBox={viewBoxString} preserveAspectRatio="none">
        <g>
          <path class="rc-progress-line-trail" d={pathString} strokeLinecap="round" stroke={this.props.trailColor} strokeWidth={this.props.trailWidth} fillOpacity="0" style={trailStyle}></path>
          <path class="rc-progress-line-path" d={pathString} strokeLinecap="round" stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} fillOpacity="0" style={pathStyle}></path>
        </g>
      </svg>
    );
  }
});

var Circle = React.createClass({
  getInitialState() {
    return {
      length: null
    }
  },
  componentDidMount(){
    var len = React.findDOMNode(this.refs.circletrail).getTotalLength()
    this.setState({length: len});
  },
  render() {
    var len = this.state.length
    var pathStyle = {
      "stroke-dasharray": len?(len + "px " + len + "px"):"none",
      "stroke-dashoffset": ((100-this.props.percent)/100*len) + "px",
      "transition": "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
    }

    var strokeWidth = this.props.strokeWidth,
        r = (50-strokeWidth/2);
    var pathString = render('M 50,50 m 0,-{radius}' +
      ' a {radius},{radius} 0 1 1 0,{2radius}' +
      ' a {radius},{radius} 0 1 1 0,-{2radius}', {
      "radius": r,
      "2radius": 2*r
    });

    var _this = this;
    var defaultProps = {
      strokeWidth: 1,
      strokeColor: "#3FC7FA",
      trailWidth: 1,
      trailColor: "#D9D9D9"
    };
    ["strokeWidth", "strokeColor", "trailWidth", "trailColor"].forEach(function(item, i, arr){
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

    return (
      <svg class="rc-progress-circle" viewBox="0 0 100 100">
        <path class="rc-progress-circle-trail" ref="circletrail" d={pathString} stroke={this.props.trailColor} strokeWidth={this.props.trailWidth} fillOpacity="0"></path>
        <path class="rc-progress-circle-path" d={pathString} strokeLinecap="round" stroke={this.props.strokeColor} strokeWidth={this.props.strokeWidth} fillOpacity="0" style={pathStyle} ></path>
      </svg>
    )
  }
})

module.exports = {
  line: Line,
  circle: Circle
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

