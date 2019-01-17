webpackJsonp([0],{

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(115);


/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress_assets_index_less__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rc_progress_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_progress__ = __webpack_require__(39);








var Example = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Example, _Component);

  function Example() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Example);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this));

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
    var containerStyle = {
      width: '250px'
    };
    var circleContainerStyle = {
      width: '250px',
      height: '250px',
      display: 'inline-block'
    };
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'h3',
        null,
        'Line Progress ',
        this.state.percent,
        '%'
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { style: containerStyle },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["b" /* Line */], { percent: this.state.percent, strokeWidth: '4', strokeColor: this.state.color })
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'h3',
        null,
        'Circle Progress ',
        this.state.percent,
        '%'
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { style: circleContainerStyle },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["a" /* Circle */], {
          percent: this.state.percent,
          strokeWidth: '6',
          strokeLinecap: 'round',
          strokeColor: this.state.color
        })
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'p',
        null,
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'button',
          { onClick: this.changeState },
          'Change State'
        )
      )
    );
  };

  return Example;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Example, null), document.getElementById('__react-content'));

/***/ })

},[114]);
//# sourceMappingURL=simple.js.map