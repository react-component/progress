const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect.js');
const Line = require('../').Line;
const Circle = require('../').Circle;

describe('line progress', () => {
  it('work', () => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    const line = ReactDOM.render(<Line percent="30" strokeWidth="1" />, div);
    expect(line.props.percent).to.be('30');
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('circle progress', () => {
  it('work', () => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    const circle = ReactDOM.render(<Circle percent="30" strokeWidth="1" />, div);
    expect(circle.props.percent).to.be('30');
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('half circle progress', () => {
  it('work', () => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    const circle = ReactDOM.render(
      <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="bottom"/>,
      div);
    expect(circle.props.percent).to.be('30');
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('half circle progress', () => {
  it('work', () => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    const circle = ReactDOM.render(
      <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="left"/>,
      div);
    expect(circle.props.percent).to.be('30');
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('half circle progress', () => {
  it('work', () => {
    const div = document.createElement(div);
    document.body.appendChild(div);
    const circle = ReactDOM.render(
      <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="right"/>,
      div);
    expect(circle.props.percent).to.be('30');
    ReactDOM.unmountComponentAtNode(div);
  });
});
