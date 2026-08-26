import React from 'react';
import { render } from '@testing-library/react';
import { Circle, Line, type ProgressProps } from '../src';

describe('Semantic', () => {
  it('hides decorative SVGs and supports explicit progress semantics', () => {
    const { container } = render(
      <>
        <Line percent={25} />
        <Circle
          percent={50}
          role="progressbar"
          aria-label="Upload progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
        />
      </>,
    );

    const [line, circle] = container.querySelectorAll('svg');
    expect(line).toHaveAttribute('role', 'presentation');
    expect(circle).toHaveAttribute('role', 'progressbar');
    expect(circle).toHaveAccessibleName('Upload progress');
    expect(circle).toHaveAttribute('aria-valuemin', '0');
    expect(circle).toHaveAttribute('aria-valuemax', '100');
    expect(circle).toHaveAttribute('aria-valuenow', '50');
  });

  describe('Circle', () => {
    function test(
      name: string,
      props: Partial<ProgressProps> = {},
      postCallback?: (cotainer: HTMLElement) => void,
    ) {
      it(name, () => {
        const classNames: ProgressProps['classNames'] = {
          root: 'my-root',
          rail: 'my-rail',
          track: 'my-track',
        };
        const styles = {
          root: { background: 'red' },
          rail: { background: 'blue' },
          track: { background: 'green' },
        };

        const { container } = render(
          <Circle percent={50} classNames={classNames} styles={styles} {...props} />,
        );

        expect(container.querySelector('.rc-progress-circle')).toHaveClass(classNames.root);
        expect(container.querySelector('.rc-progress-circle-rail')).toHaveClass(classNames.rail);
        expect(container.querySelector('.rc-progress-circle-path')).toHaveClass(classNames.track);

        expect(container.querySelector('.my-root')).toHaveStyle(styles.root);
        expect(container.querySelector('.my-rail')).toHaveStyle(styles.rail);
        expect(container.querySelector('.my-track')).toHaveStyle(styles.track);

        postCallback?.(container);
      });
    }

    test('basic');

    test(
      'gradient',
      {
        strokeColor: {
          '0%': '#f00',
          '100%': '#0f0',
        },
      },
      (container) => {
        expect(container.querySelector('foreignObject')).toBeTruthy();
      },
    );
  });
});
