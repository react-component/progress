interface IndeterminateOption {
  percent: number | number[];
}

export default (options: IndeterminateOption) => {
  if (options.percent !== null) {
    return {
      ...options,
      indeterminateStylePops: {},
      indeterminateStyleTag: null,
    };
  }

  const animationName = 'circle-indeterminate-animate';
  const percent = 40;

  return {
    percent,
    indeterminateStylePops: {
      transform: 'rotate(0deg)',
      animation: `${animationName} 1s linear infinite`,
    },
    indeterminateStyleTag: (
      <style>
        {`@keyframes ${animationName} {
            0 % { transform: rotate(0deg);}
            100% {transform: rotate(360deg);}
          }`}
      </style>
    ),
  };
};
