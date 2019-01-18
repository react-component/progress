webpackJsonp([1],{

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(113);


/***/ }),

/***/ 113:
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








var colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
function getColor(index) {
  return colorMap[(index + colorMap.length) % colorMap.length];
}

var Example = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Example, _Component);

  function Example() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Example);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this));

    _this.state = {
      percent: 30,
      colorIndex: 0
    };
    _this.changeState = _this.changeState.bind(_this);
    return _this;
  }

  Example.prototype.changeState = function changeState() {
    var value = parseInt(Math.random() * 100, 10);
    var colorIndex = parseInt(Math.random() * 3, 10);
    this.setState({
      percent: value,
      colorIndex: colorIndex
    });
  };

  Example.prototype.render = function render() {
    var circleContainerStyle = {
      width: '200px',
      height: '200px'
    };
    var _state = this.state,
        percent = _state.percent,
        colorIndex = _state.colorIndex;

    var color = getColor(colorIndex);
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'p',
        null,
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'button',
          { onClick: this.changeState },
          'Change State [',
          percent,
          ']'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { style: circleContainerStyle },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["a" /* Circle */], {
          percent: percent,
          gapDegree: 70,
          gapPosition: 'top',
          strokeWidth: '6',
          strokeLinecap: 'square',
          strokeColor: color
        })
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { style: circleContainerStyle },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["a" /* Circle */], {
          percent: [percent / 3, percent / 3, percent / 3],
          gapDegree: 70,
          gapPosition: 'bottom',
          strokeWidth: '6',
          trailWidth: '6',
          strokeLinecap: 'round',
          strokeColor: [color, getColor(colorIndex + 1), getColor(colorIndex + 2)]
        })
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { style: circleContainerStyle },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["a" /* Circle */], {
          percent: percent,
          gapDegree: 70,
          gapPosition: 'left',
          strokeWidth: '6',
          strokeLinecap: 'square',
          strokeColor: color
        })
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { style: circleContainerStyle },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_rc_progress__["a" /* Circle */], {
          percent: percent,
          gapDegree: 70,
          gapPosition: 'right',
          strokeWidth: '6',
          strokeLinecap: 'square',
          strokeColor: color
        })
      )
    );
  };

  return Example;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Example, null), document.getElementById('__react-content'));

/***/ })

},[112]);
//# sourceMappingURL=gap.js.map