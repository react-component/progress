webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(36);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcProgress = __webpack_require__(174);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tm = void 0;
	
	var App = _react2.default.createClass({
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
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: 10, width: 200 } },
	      _react2.default.createElement(_rcProgress.Circle, { strokeWidth: '6', percent: this.state.percent }),
	      _react2.default.createElement(_rcProgress.Line, { strokeWidth: '4', percent: this.state.percent }),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.restart },
	        'Restart'
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=fast-progress.js.map