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
	
	var _reactDom = __webpack_require__(38);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcProgress = __webpack_require__(184);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this));
	
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