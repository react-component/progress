webpackJsonp([0],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_progress_assets_index_less__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_progress_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_progress_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_progress__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_progress__);









var Example = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Example, _Component);

  function Example() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Example);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this));

    _this.state = {
      percent: 30,
      color: '#3FC7FA'
    };
    _this.changeState = _this.changeState.bind(_this);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Example, [{
    key: 'changeState',
    value: function changeState() {
      var colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
      var value = parseInt(Math.random() * 100, 10);
      this.setState({
        percent: value,
        color: colorMap[parseInt(Math.random() * 3, 10)]
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var containerStyle = {
        width: '250px'
      };
      var circleContainerStyle = {
        width: '250px',
        height: '250px',
        display: 'inline-block'
      };
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'h3',
          null,
          'Line Progress ',
          this.state.percent,
          '%'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { style: containerStyle },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_progress__["Line"], { percent: this.state.percent, strokeWidth: '4', strokeColor: this.state.color })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'h3',
          null,
          'Circle Progress ',
          this.state.percent,
          '%'
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { style: circleContainerStyle },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_progress__["Circle"], {
            percent: this.state.percent,
            strokeWidth: '6',
            strokeLinecap: 'square',
            strokeColor: this.state.color
          })
        ),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'p',
          null,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'button',
            { onClick: this.changeState },
            'Change State'
          )
        )
      );
    }
  }]);

  return Example;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Example, null), document.getElementById('__react-content'));

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(139);


/***/ })

},[291]);
//# sourceMappingURL=simple.js.map