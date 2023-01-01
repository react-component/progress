interface IndeterminateOption {
  percent: number | number[];
  strokeLinecap: string;
  strokeWidth: number;
}

export default (options: IndeterminateOption) => {
  if (options.percent !== null) {
    return {
      percent: options.percent,
      indeterminateStylePops: {},
      indeterminateStyleTag: null,
    };
  }
  const animationName = 'line-indeterminate-animate';
  const percent = 40;
  const strokeDashOffset =
    100 - (percent + (options.strokeLinecap === 'round' ? options.strokeWidth : 0));

  return {
    percent,
    indeterminateStylePops: {
      strokeDasharray: `${percent} 100`,
      animation: `${animationName} .6s linear alternate infinite`,
      strokeDashoffset: 0,
    },
    indeterminateStyleTag: (
      <style>
        {`@keyframes ${animationName} {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -${strokeDashOffset};
          }`}
      </style>
    ),
  };
};
