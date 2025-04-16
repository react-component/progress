import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Circle, Line } from '../src';

describe('Progress', () => {
  describe('Line', () => {
    it('change with animation', () => {
      function Demo() {
        const [percent, setPercent] = React.useState('0');
        return (
          <>
            <Line percent={percent} strokeWidth="1" />
            <button onClick={() => setPercent('30')}>change</button>
          </>
        );
      }
      const { container, getByText, unmount } = render(<Demo />);
      expect(container.firstChild).toMatchSnapshot();
      act(() => {
        getByText('change').click();
      });
      expect(container.firstChild).toMatchSnapshot();
      unmount();
    });
  });

  describe('Diff Line', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <div>
          <Line percent={20} strokeLinecap="butt" />
          <br />
          <Line percent={20} strokeLinecap="round" />
          <br />
          <Line percent={20} strokeLinecap="square" />
        </div>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Circle', () => {
    it('change with animation', () => {
      function Demo() {
        const [percent, setPercent] = React.useState('0');
        return (
          <>
            <Circle percent={percent} strokeWidth="1" />
            <button onClick={() => setPercent('30')}>change</button>
          </>
        );
      }
      const { container, getByText, unmount } = render(<Demo />);
      expect(container.firstChild).toMatchSnapshot();
      act(() => {
        getByText('change').click();
      });
      expect(container.firstChild).toMatchSnapshot();
      unmount();
    });

    it('should gradient works and circles have different gradient IDs', () => {
      const { container } = render(
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
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should show right gapPosition', () => {
      const { container } = render(
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
      expect(container.firstChild).toMatchSnapshot();
    });

    // https://github.com/ant-design/ant-design/issues/30552
    it('should change strokeColor between gradient and color string correctly', () => {
      const gradientColor = {
        '0%': '#108ee9',
        '100%': '#87d068',
      };
      const { container, rerender } = render(<Circle strokeColor={gradientColor} />);
      expect(container.querySelector('.rc-progress-circle-path').style.cssText).not.toContain(
        'stroke:',
      );
      act(() => {
        rerender(<Circle strokeColor="#eeeeee" />);
      });
      expect(container.querySelector('.rc-progress-circle-path').style.cssText).toContain(
        'stroke: #eeeeee',
      );
      act(() => {
        rerender(<Circle strokeColor={gradientColor} />);
      });
      expect(container.querySelector('.rc-progress-circle-path').style.cssText).not.toContain(
        'stroke:',
      );
    });

    it('should support ts onClick', () => {
      const onClick = jest.fn();
      const { container } = render(
        <div>
          <Circle onClick={onClick} className="circle-target" />
          <Line onClick={onClick} className="line-target" />
        </div>,
      );
      act(() => {
        fireEvent.click(container.querySelector('.circle-target'));
      });
      expect(onClick).toHaveBeenCalledTimes(1);
      act(() => {
        fireEvent.click(container.querySelector('.line-target'));
      });
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should steps works with no error', () => {
      const steps = 4;
      const percent = 35;
      const { container, rerender } = render(
        <Circle
          steps={steps}
          percent={percent}
          strokeColor="red"
          trailColor="grey"
          strokeWidth={20}
        />,
      );
      expect(container.querySelectorAll('.rc-progress-circle-path')).toHaveLength(steps);
      expect(container.querySelectorAll('.rc-progress-circle-path')[0].style.cssText).toContain(
        'stroke: red;',
      );
      expect(container.querySelectorAll('.rc-progress-circle-path')[1].style.cssText).toContain(
        'stroke: grey;',
      );
      act(() => {
        rerender(
          <Circle
            steps={steps}
            percent={percent}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            trailColor="grey"
            strokeWidth={20}
          />,
        );
      });
      expect(
        container.querySelectorAll('.rc-progress-circle-path')[0].getAttribute('stroke'),
      ).toContain('url(');
    });
    it('should steps works with gap', () => {
      const { container } = render(
        <Circle
          steps={{ space: 2, count: 5 }}
          gapDegree={60}
          percent={50}
          strokeColor="red"
          trailColor="grey"
          strokeWidth={20}
        />,
      );
      expect(container.querySelectorAll('.rc-progress-circle-path')).toHaveLength(5);
      expect(container.querySelectorAll('.rc-progress-circle-path')[0].style.cssText).toContain(
        'transform: rotate(120deg);',
      );
    });
  });

  it('should support percentage array changes', () => {
    function Demo() {
      const [subPathsCount, setSubPathsCount] = React.useState(2);
      const percent = 80;
      const multiPercentage = new Array(subPathsCount).fill(
        percent / subPathsCount,
        0,
        subPathsCount,
      );
      return (
        <>
          <Circle percent={multiPercentage} strokeWidth="1" data-testid="circle" />
          <Line percent={multiPercentage} strokeWidth="1" />
          <button onClick={() => setSubPathsCount(4)}>change</button>
        </>
      );
    }
    const { getByText, container, unmount } = render(<Demo />);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      getByText('change').click();
    });
    expect(container.firstChild).toMatchSnapshot();
    unmount();
  });
});
