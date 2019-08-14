/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { Line, Circle } from '../src';

function getGradientIdFromDef(def) {
  return def.firstElementChild.attributes.getNamedItem('id').value;
}

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
      expect(line.props.percent).toBe('30');
    });
  });

  describe('Circle', () => {
    it('works', () => {
      const circle = ReactDOM.render(<Circle percent="30" strokeWidth="1" />, div);
      expect(circle.props.percent).toBe('30');
    });

    it('gap degree bottom', () => {
      const circle = ReactDOM.render(
        <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="bottom" />,
        div,
      );
      expect(circle.props.percent).toBe('30');
    });

    it('gap degree top', () => {
      const circle = ReactDOM.render(
        <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="top" />,
        div,
      );
      expect(circle.props.percent).toBe('30');
    });

    it('gap degree left', () => {
      const circle = ReactDOM.render(
        <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="left" />,
        div,
      );
      expect(circle.props.percent).toBe('30');
    });

    it('gap degree right', () => {
      const circle = ReactDOM.render(
        <Circle percent="30" strokeWidth="1" gapDegree={70} gapPosition="right" />,
        div,
      );
      expect(circle.props.percent).toBe('30');
    });

    it('change with animation', () => {
      class Demo extends React.Component {
        state = {
          percent: '0',
        };

        render() {
          const { percent } = this.state;
          return <Circle percent={percent} strokeWidth="1" />;
        }
      }
      const circle = ReactDOM.render(<Demo />, div);
      expect(circle.state.percent).toBe('0');
      circle.setState({
        percent: '30',
      });
      expect(circle.state.percent).toBe('30');
    });

    it('circle support gradient color', () => {
      ReactDOM.render(
        <Circle
          percent={90}
          strokeWidth="6"
          strokeLinecap="round"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />,
        div,
      );

      // Since it's the 7th circle.
      expect(getGradientIdFromDef(div.querySelector('defs'))).toBe(`rc-progress-gradient-6`);
    });

    it('should circles have different gradient IDs', () => {
      ReactDOM.render(
        <>
          <Circle
            percent={90}
            strokeWidth="6"
            strokeLinecap="round"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <Circle
            percent={90}
            strokeWidth="6"
            strokeLinecap="round"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </>,
        div,
      );

      const gradientDefs = div.querySelectorAll('defs');
      const idFirst = getGradientIdFromDef(gradientDefs[0]);
      const idSecond = getGradientIdFromDef(gradientDefs[1]);
      expect(idFirst === idSecond).toBeFalsy();
    });
  });
});
