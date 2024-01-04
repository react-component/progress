import React from 'react';

interface IndeterminateOption {
  loading: boolean;
  percent: number;
  strokeLinecap: string;
  strokeWidth: number;
}

export default (options: IndeterminateOption) => {
  const { percent, strokeLinecap, strokeWidth, loading } = options;
  if (!loading) {
    return {
      indeterminateStyleProps: {},
      indeterminateStyleAnimation: null,
    };
  }
  const animationName = 'line-indeterminate-animate';
  const strokeDashOffset = 100 - (percent + (strokeLinecap === 'round' ? strokeWidth : 0));

  return {
    indeterminateStyleProps: {
      strokeDasharray: `${percent} 100`,
      animation: `${animationName} .6s linear alternate infinite`,
      strokeDashoffset: 0,
    },
    indeterminateStyleAnimation: (
      <style>
        {`@keyframes ${animationName} {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -${strokeDashOffset};
          }`}
      </style>
    ),
  };
};
