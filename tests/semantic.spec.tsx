import React from 'react';
import { render } from '@testing-library/react';
import { Circle, type ProgressProps } from '../src';

describe('Semantic', () => {
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
        expect(container.querySelector('.rc-progress-circle-trail')).toHaveClass(classNames.rail);
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
