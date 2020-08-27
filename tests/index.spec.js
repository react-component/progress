/* eslint-disable react/no-render-return-value */
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { mount } from 'enzyme';
import { Line, Circle } from '../src';

function getGradientIdFromDef(def) {
  return def.firstElementChild.attributes.getNamedItem('id').value;
}

describe('Progress', () => {
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

      const line = mount(<Demo />);
      expect(line.state().percent).toBe('0');
      line.setState({ percent: '30' });
      expect(line.state().percent).toBe('30');
      line.unmount();
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
      const circle = mount(<Demo />);
      expect(circle.state().percent).toBe('0');
      circle.setState({ percent: '30' });
      expect(circle.state().percent).toBe('30');
      circle.unmount();
    });

    it('should gradient works and circles have different gradient IDs', () => {
      mount(
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
      );

      const gradientDefs = document.querySelectorAll('defs');
      console.log(gradientDefs);
      const idFirst = getGradientIdFromDef(gradientDefs[0]);
      const idSecond = getGradientIdFromDef(gradientDefs[1]);
      const idRE = /^rc-progress-gradient-\d{1,}$/;
      expect(idFirst).toMatch(idRE);
      expect(idSecond).toMatch(idRE);
      expect(idFirst === idSecond).toBeFalsy();
    });
  });
});
