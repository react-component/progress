'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

var expect = require('expect.js');
var Line = require('../').Line;
var Circle = require('../').Circle;
describe('line progress', function () {
  it('work', function () {
    var div = document.createElement(div);
    document.body.appendChild(div);
    var line = React.render(<Line percent="30" strokeWidth="1" />, div);
    expect(line.props.percent).to.be("30");
    React.unmountComponentAtNode(div);
  });
});

describe('circle progress', function () {
  it('work', function () {
    var div = document.createElement(div);
    document.body.appendChild(div);
    var circle = React.render(<Circle percent="30" strokeWidth="1" />, div);
    expect(circle.props.percent).to.be("30");
    React.unmountComponentAtNode(div);
  });
});
