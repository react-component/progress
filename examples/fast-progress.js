webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	var Line = __webpack_require__(3).Line;
	var Circle = __webpack_require__(3).Circle;
	var React = __webpack_require__(6);
	var ReactDOM = __webpack_require__(41);
	
	var tm = void 0;
	
	var App = React.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      percent: 0
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.increase();
	  },
	  increase: function increase() {
	    var percent = this.state.percent + 1;
	    if (percent > 100) {
	      percent = 100;
	      clearTimeout(tm);
	      return;
	    }
	    this.setState({ percent: percent });
	    tm = setTimeout(this.increase, 10);
	  },
	  restart: function restart() {
	    var _this = this;
	
	    clearTimeout(tm);
	    this.setState({ percent: 0 }, function () {
	      _this.increase();
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { style: { margin: 10, width: 200 } },
	      React.createElement(Circle, { strokeWidth: '6', percent: this.state.percent }),
	      React.createElement(Line, { strokeWidth: '4', percent: this.state.percent }),
	      React.createElement(
	        'button',
	        { onClick: this.restart },
	        'Restart'
	      )
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(App, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=fast-progress.js.map