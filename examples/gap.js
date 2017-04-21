webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(192);


/***/ },

/***/ 192:
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
	
	var Example = function (_Component) {
	  _inherits(Example, _Component);
	
	  function Example() {
	    _classCallCheck(this, Example);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this));
	
	    _this.state = {
	      percent: 30,
	      color: '#3FC7FA'
	    };
	    _this.changeState = _this.changeState.bind(_this);
	    return _this;
	  }
	
	  Example.prototype.changeState = function changeState() {
	    var colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
	    var value = parseInt(Math.random() * 100, 10);
	    this.setState({
	      percent: value,
	      color: colorMap[parseInt(Math.random() * 3, 10)]
	    });
	  };
	
	  Example.prototype.render = function render() {
	    var circleContainerStyle = {
	      width: '200px',
	      height: '200px'
	    };
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { style: circleContainerStyle },
	        _react2.default.createElement(_rcProgress.Circle, {
	          percent: this.state.percent,
	          gapDegree: 70,
	          gapPosition: 'top',
	          strokeWidth: '6',
	          strokeLinecap: 'square',
	          strokeColor: this.state.color
	        })
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: circleContainerStyle },
	        _react2.default.createElement(_rcProgress.Circle, {
	          percent: this.state.percent,
	          gapDegree: 70,
	          gapPosition: 'bottom',
	          strokeWidth: '6',
	          strokeLinecap: 'square',
	          strokeColor: this.state.color
	        })
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: circleContainerStyle },
	        _react2.default.createElement(_rcProgress.Circle, {
	          percent: this.state.percent,
	          gapDegree: 70,
	          gapPosition: 'left',
	          strokeWidth: '6',
	          strokeLinecap: 'square',
	          strokeColor: this.state.color
	        })
	      ),
	      _react2.default.createElement(
	        'div',
	        { style: circleContainerStyle },
	        _react2.default.createElement(_rcProgress.Circle, {
	          percent: this.state.percent,
	          gapDegree: 70,
	          gapPosition: 'right',
	          strokeWidth: '6',
	          strokeLinecap: 'square',
	          strokeColor: this.state.color
	        })
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        _react2.default.createElement(
	          'button',
	          { onClick: this.changeState },
	          'Change State'
	        )
	      )
	    );
	  };
	
	  return Example;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Example, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=gap.js.map