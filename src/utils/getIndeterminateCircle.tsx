import React from 'react';

interface IndeterminateOption {
  loading: boolean;
}

export default (options: IndeterminateOption) => {
  if (!options.loading) {
    return {
      indeterminateStyleProps: {},
      indeterminateStyleAnimation: null,
    };
  }

  const animationName = 'circle-indeterminate-animate';

  return {
    indeterminateStyleProps: {
      transform: 'rotate(0deg)',
      animation: `${animationName} 1s linear infinite`,
    },
    indeterminateStyleAnimation: (
      <style>
        {`@keyframes ${animationName} {
            0 % { transform: rotate(0deg);}
            100% {transform: rotate(360deg);}
          }`}
      </style>
    ),
  };
};
