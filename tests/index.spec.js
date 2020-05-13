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
    it('change with animation', () => {
      class Demo extends React.Component {
        state = {
          percent: '0',
        };

        render() {
          const { percent } = this.state;
          return <Line percent={percent} strokeWidth="1" />;
        }
      }
      const line = ReactDOM.render(<Demo />, div);
      expect(line.state.percent).toBe('0');
      line.setState({
        percent: '30',
      });
      expect(line.state.percent).toBe('30');
    });
  });

  describe('Circle', () => {
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

    it('should gradient works and circles have different gradient IDs', () => {
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
      const idRE = /^rc-progress-gradient-\d{1,}$/;
      expect(idFirst).toMatch(idRE);
      expect(idSecond).toMatch(idRE);
      expect(idFirst === idSecond).toBeFalsy();
    });
  });
});
