webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	// use jsx to render html, do not modify simple.html
	__webpack_require__(4);
	var Progress = __webpack_require__(3);
	var React = __webpack_require__(2);
	var Example = React.createClass({displayName: "Example",
	  getInitialState: function(){
	    return {
	      status: 'active', //success|failed|active
	      percent: '0%'
	    }
	  },
	  changeState: function(){
	    if(this.state.status === 'active'){
	      this.setState({status: 'success'});
	    }else if(this.state.status === 'success'){
	      this.setState({status: 'failed'});
	    }else if(this.state.status === 'failed'||!this.state.status){
	      this.setState({status: 'active'});
	    }
	    this.setState({percent: parseInt(Math.random()*100)+'%'});
	  },
	  render: function(){
	    return (


	      React.createElement("div", null, 
	        React.createElement(Progress, {state: this.state.status, percent: this.state.percent, title: "进度"}), 
	        React.createElement("p", null, 
	          React.createElement("button", {onClick: this.changeState}, "Change State")
	        )
	      )
	      );
	  }
	})
	React.render(React.createElement(Example, null), document.getElementById('__react-content'));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/progress/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/progress/assets/index.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/progress/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/progress/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	exports.push([module.id, ".rc-progress {\n  font-size: 12px;\n  display: inline-block;\n  vertical-align: middle;\n}\n.rc-progress > div {\n  display: inline-block;\n  vertical-align: middle;\n}\n.rc-progress .rc-progress-bg {\n  background: #FBFBFB;\n  border: 1px solid #f3f3f3;\n  width: 170px;\n  height: 10px;\n  border-radius: 100px;\n  margin-right: 12px;\n  margin-left: 6px;\n  overflow: hidden;\n}\n.rc-progress .rc-progress-bar {\n  float: left;\n  background: #3fc7fa;\n  height: 100%;\n  border-radius: 10px;\n  transition: width 0.6s ease 0s;\n  box-shadow: -10px 0 0;\n  position: relative;\n  color: #3fc7fa;\n}\n.rc-progress-active .rc-progress-bar {\n  border-radius: 10px;\n}\n.rc-progress-success .rc-progress-bar {\n  background: #87d068;\n  color: #87d068;\n}\n.rc-progress-failed .rc-progress-bg {\n  background: #fff;\n  border: 1px solid #fe8c6a;\n  box-shadow: none;\n}\n.rc-progress-failed .rc-progress-bar {\n  background: #fe8c6a;\n  color: #fe8c6a;\n}\n", ""]);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(2);
	var rcUtil = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"rc-util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Progress = React.createClass({displayName: "Progress",
	  render: function () {
	    var classes = rcUtil.classSet({
	      'rc-progress': true,
	      'rc-progress-success': (this.props.state === 'success'),
	      'rc-progress-active': (this.props.state === 'active'),
	      'rc-progress-failed': (this.props.state === 'failed')
	    });
	    var percentWidth = {
	      width: this.props.percent
	    };
	    return (
	      React.createElement("div", {className: classes}, 
	        React.createElement("div", {className: "rc-progress-title"}, this.props.title), 
	        React.createElement("div", {className: "rc-progress-bg"}, 
	          React.createElement("div", {className: "rc-progress-bar", style: percentWidth})
	        ), 
	        React.createElement("div", {className: "rc-progress-percent"}, this.props.percent)
	      )
	    );
	  }
	});
	module.exports = Progress;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ }
]);