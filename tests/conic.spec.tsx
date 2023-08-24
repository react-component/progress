/* eslint-disable react/no-render-return-value */
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { render } from '@testing-library/react';
import { Circle } from '../src';

describe('Circle.conic', () => {
  it('should work', () => {
    const { asFragment } = render(
      <Circle
        percent={100}
        strokeWidth={6}
        strokeColor={{
          conic: true,
          '0%': 'green',
          '99%': 'red',
          '100%': 'blue',
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('gapDegree', () => {
    const { asFragment } = render(
      <Circle
        percent={100}
        gapDegree={70}
        strokeWidth={6}
        strokeColor={{
          conic: true,
          '0%': 'green',
          '99%': 'red',
          '100%': 'blue',
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
