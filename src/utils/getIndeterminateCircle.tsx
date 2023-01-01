interface IndeterminateOption {
  loading: boolean;
}

export default (options: IndeterminateOption) => {
  if (!options.loading) {
    return {
      indeterminateStylePops: {},
      indeterminateStyleTag: null,
    };
  }

  const animationName = 'circle-indeterminate-animate';

  return {
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
