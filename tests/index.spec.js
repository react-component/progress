/* eslint-disable react/no-render-return-value */
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { mount } from 'enzyme';
import { Circle, Line } from '../src';

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

  describe('Diff Line', () => {
    const wrapper = mount(
      <div>
        <Line percent={20} strokeLinecap="butt" />
        <br />
        <Line percent={20} strokeLinecap="round" />
        <br />
        <Line percent={20} strokeLinecap="square" />
      </div>,
    );
    expect(wrapper.render()).toMatchSnapshot();
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
      const wrapper = mount(
        <div>
          <Circle
            percent={90}
            strokeWidth={6}
            strokeLinecap="round"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
          <Circle
            percent={90}
            strokeWidth={6}
            strokeLinecap="round"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>,
      );

      expect(wrapper.render()).toMatchSnapshot();
    });

    it('should show right gapPosition', () => {
      const wrapper = mount(
        <div>
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="top"
            strokeWidth={6}
            strokeLinecap="square"
          />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="bottom"
            strokeWidth={6}
            strokeLinecap="square"
          />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="left"
            strokeWidth={6}
            strokeLinecap="square"
          />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="right"
            strokeWidth={6}
            strokeLinecap="square"
          />
          <Circle
            percent={30}
            gapDegree={70}
            gapPosition="top"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <Circle percent={30} gapDegree={70} gapPosition="top" strokeWidth={6} />
        </div>,
      );

      expect(wrapper.render()).toMatchSnapshot();
    });

    // https://github.com/ant-design/ant-design/issues/30552
    it('should change strokeColor between gradient and color string correctly', () => {
      const gradientColor = {
        '0%': '#108ee9',
        '100%': '#87d068',
      };
      const wrapper = mount(<Circle strokeColor={gradientColor} />);
      expect(wrapper.find('.rc-progress-circle-path').getDOMNode().style.cssText).not.toContain(
        'stroke:',
      );
      wrapper.setProps({ strokeColor: '#eeeeee' });
      expect(wrapper.find('.rc-progress-circle-path').getDOMNode().style.cssText).toContain(
        'stroke: #eeeeee',
      );
      wrapper.setProps({ strokeColor: gradientColor });
      expect(wrapper.find('.rc-progress-circle-path').getDOMNode().style.cssText).not.toContain(
        'stroke:',
      );
    });

    it('should support ts onClick', () => {
      const onClick = jest.fn();
      const wrapper = mount(
        <div>
          <Circle onClick={onClick} className="circle-target" />
          <Line onClick={onClick} className="line-target" />
        </div>,
      );

      wrapper.find('.circle-target').at(0).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      wrapper.find('.line-target').at(0).simulate('click');
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should steps works with no error', () => {
      const steps = 4;
      const percent = 35;
      const wrapper = mount(
        <Circle
          steps={steps}
          percent={percent}
          strokeColor="red"
          trailColor="grey"
          strokeWidth={20}
        />,
      );

      expect(wrapper.find('.rc-progress-circle-path')).toHaveLength(steps);
      expect(wrapper.find('.rc-progress-circle-path').at(0).getDOMNode().style.cssText).toContain(
        'stroke: red;',
      );
      expect(wrapper.find('.rc-progress-circle-path').at(1).getDOMNode().style.cssText).toContain(
        'stroke: grey;',
      );

      wrapper.setProps({
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
      });
      expect(wrapper.find('.rc-progress-circle-path').at(0).props().stroke).toContain('url(');
    });
    it('should steps works with gap', () => {
      const wrapper = mount(
        <Circle
          steps={{ space: 2, count: 5 }}
          gapDegree={60}
          percent={50}
          strokeColor="red"
          trailColor="grey"
          strokeWidth={20}
        />,
      );
      expect(wrapper.find('.rc-progress-circle-path')).toHaveLength(5);
      expect(wrapper.find('.rc-progress-circle-path').at(0).getDOMNode().style.cssText).toContain(
        'transform: rotate(120deg);',
      );
    });
  });

  it('should support percentage array changes', () => {
    class Demo extends React.Component {
      state = {
        subPathsCount: 2,
      };

      render() {
        const { subPathsCount } = this.state;
        const percent = 80;
        const multiPercentage = new Array(subPathsCount).fill(
          percent / subPathsCount,
          0,
          subPathsCount,
        );

        return (
          <>
            <Circle percent={multiPercentage} strokeWidth="1" />
            <Line percent={multiPercentage} strokeWidth="1" />
          </>
        );
      }
    }

    const circle = mount(<Demo />);
    expect(circle.find(Circle).props().percent).toEqual([40, 40]);
    circle.setState({ subPathsCount: 4 });
    expect(circle.find(Circle).props().percent).toEqual([20, 20, 20, 20]);
    circle.unmount();
  });
});
