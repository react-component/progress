/* eslint-disable react/no-render-return-value */
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { mount } from 'enzyme';
import { Line, Circle } from '../src';

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
      const c = mount(
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

      const gradientDefs = c.find('defs');
      const idFirst = gradientDefs.at(0).props().children.props.id;
      const idSecond = gradientDefs.at(1).props().children.props.id;
      const idRE = /^rc-progress-gradient-\d{1,}$/;
      expect(idFirst).toMatch(idRE);
      expect(idSecond).toMatch(idRE);
      expect(idFirst === idSecond).toBeFalsy();
    });

    it('should show right gapPosition', () => {
      const wrapper = mount(
        <>
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="top"
            strokeWidth="6"
            strokeLinecap="square"
          />
          <br />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth="6"
            strokeLinecap="square"
          />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="left"
            strokeWidth="6"
            strokeLinecap="square"
          />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="right"
            strokeWidth="6"
            strokeLinecap="square"
          />
        </>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
