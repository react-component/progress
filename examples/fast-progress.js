webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(2);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(3);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(72);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(80);
	
	var _react = __webpack_require__(81);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(116);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcProgress = __webpack_require__(262);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = function (_Component) {
	  (0, _inherits3.default)(App, _Component);
	
	  function App() {
	    (0, _classCallCheck3.default)(this, App);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));
	
	    _this.state = {
	      percent: 0
	    };
	    _this.increase = _this.increase.bind(_this);
	    _this.restart = _this.restart.bind(_this);
	    return _this;
	  }
	
	  App.prototype.componentDidMount = function componentDidMount() {
	    this.increase();
	  };
	
	  App.prototype.increase = function increase() {
	    var percent = this.state.percent + 1;
	    if (percent >= 100) {
	      clearTimeout(this.tm);
	      return;
	    }
	    this.setState({ percent: percent });
	    this.tm = setTimeout(this.increase, 10);
	  };
	
	  App.prototype.restart = function restart() {
	    var _this2 = this;
	
	    clearTimeout(this.tm);
	    this.setState({ percent: 0 }, function () {
	      _this2.increase();
	    });
	  };
	
	  App.prototype.render = function render() {
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
	  };
	
	  return App;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=fast-progress.js.map