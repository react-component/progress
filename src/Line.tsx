import * as React from 'react';
import { clsx } from 'clsx';
import { useTransitionDuration, defaultProps } from './common';
import type { ProgressProps } from './interface';
import getIndeterminateLine from './utils/getIndeterminateLine';
import useId from '@rc-component/util/lib/hooks/useId';

const Line: React.FC<ProgressProps> = (props) => {
  const {
    id,
    className,
    percent,
    prefixCls,
    strokeColor,
    strokeLinecap,
    strokeWidth,
    style,
    railColor,
    railWidth,
    transition,
    loading,
    ...restProps
  } = {
    ...defaultProps,
    ...props,
  };

  const mergedId = useId(id);

  // eslint-disable-next-line no-param-reassign
  delete restProps.gapPosition;
  const percentList = Array.isArray(percent) ? percent : [percent];
  const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

  const paths = useTransitionDuration();

  const center = strokeWidth / 2;
  const right = 100 - strokeWidth / 2;
  const pathString = `M ${strokeLinecap === 'round' ? center : 0},${center}
         L ${strokeLinecap === 'round' ? right : 100},${center}`;
  const viewBoxString = `0 0 100 ${strokeWidth}`;
  let stackPtg = 0;
  const { indeterminateStyleProps, indeterminateStyleAnimation } = getIndeterminateLine({
    id: mergedId,
    loading,
    percent: percentList[0],
    strokeLinecap,
    strokeWidth,
  });

  return (
    <svg
      className={clsx(`${prefixCls}-line`, className)}
      viewBox={viewBoxString}
      preserveAspectRatio="none"
      style={style}
      {...restProps}
    >
      <path
        className={`${prefixCls}-line-rail`}
        d={pathString}
        strokeLinecap={strokeLinecap}
        stroke={railColor}
        strokeWidth={railWidth || strokeWidth}
        fillOpacity="0"
      />
      {percentList.map((ptg, index) => {
        let dashPercent = 1;
        switch (strokeLinecap) {
          case 'round':
            dashPercent = 1 - strokeWidth / 100;
            break;
          case 'square':
            dashPercent = 1 - strokeWidth / 2 / 100;
            break;
          default:
            dashPercent = 1;
            break;
        }
        const pathStyle: React.CSSProperties = {
          strokeDasharray: `${ptg * dashPercent}px, 100px`,
          strokeDashoffset: `-${stackPtg}px`,
          transition:
            transition ||
            'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
          ...indeterminateStyleProps,
        };
        const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        stackPtg += ptg;
        return (
          <path
            key={index}
            className={`${prefixCls}-line-path`}
            d={pathString}
            strokeLinecap={strokeLinecap}
            stroke={color as string}
            strokeWidth={strokeWidth}
            fillOpacity="0"
            ref={(elem) => {
              // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
              // React will call the ref callback with the DOM element when the component mounts,
              // and call it with `null` when it unmounts.
              // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.

              paths[index] = elem;
            }}
            style={pathStyle}
          />
        );
      })}
      {indeterminateStyleAnimation}
    </svg>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Line.displayName = 'Line';
}

export default Line;
