import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect.js';
import { Line, Circle } from '../src/index.js';

describe('Progress', () => {
  let div = null;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  describe('Line', () => {
    it('works', () => {
      const line = ReactDOM.render(<Line percent="30" strokeWidth="1" />, div);
      expect(line.props.percent).to.be('30');
    });
  });

  describe('Circle', () => {
    it('works', () => {
      const circle = ReactDOM.render(<Circle percent="30" strokeWidth="1" />, div);
      expect(circle.props.percent).to.be('30');
    });

    it('gap degree bottom', () => {
      const circle = ReactDOM.render(
          <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="bottom" />
          , div);
      expect(circle.props.percent).to.be('30');
    });

    it('gap degree top', () => {
      const circle = ReactDOM.render(
          <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="top" />
          , div);
      expect(circle.props.percent).to.be('30');
    });

    it('gap degree left', () => {
      const circle = ReactDOM.render(
          <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="left" />
          , div);
      expect(circle.props.percent).to.be('30');
    });

    it('gap degree right', () => {
      const circle = ReactDOM.render(
          <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="right" />
          , div);
      expect(circle.props.percent).to.be('30');
    });

    it('change with animation', () => {
      class Demo extends React.Component {
        state = {
          percent: '0',
        }
        render() {
          return (
            <div>
              <Circle percent={this.state.percent} strokeWidth="1" />
            </div>
          );
        }
      }
      const circle = ReactDOM.render(<Demo />, div);
      expect(circle.state.percent).to.be('0');
      circle.setState({
        percent: '30',
      });
      expect(circle.state.percent).to.be('30');
    });
  });
});
