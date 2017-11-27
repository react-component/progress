webpackJsonp([2],{

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress_assets_index_less__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_progress_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rc_progress_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_progress__ = __webpack_require__(43);








var App = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(App, _Component);

  function App() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, App);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this));

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
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      { style: { margin: 10, width: 200 } },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["a" /* Circle */], { strokeWidth: '6', percent: this.state.percent }),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["b" /* Line */], { strokeWidth: '4', percent: this.state.percent }),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'button',
        { onClick: this.restart },
        'Restart'
      )
    );
  };

  return App;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(App, null), document.getElementById('__react-content'));

/***/ })

},[67]);
//# sourceMappingURL=fast-progress.js.map