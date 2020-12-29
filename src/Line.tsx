import * as React from 'react';
import classNames from 'classnames';
import { useTransitionDuration, defaultProps } from './common';
import { ProgressProps } from './interface';

const Line: React.FC<ProgressProps> = ({
  className,
  percent,
  prefixCls,
  strokeColor,
  strokeLinecap,
  strokeWidth,
  style,
  trailColor,
  trailWidth,
  transition,
  ...restProps
}) => {
  // eslint-disable-next-line no-param-reassign
  delete restProps.gapPosition;
  const percentList = Array.isArray(percent) ? percent : [percent];
  const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

  const [paths] = useTransitionDuration(percentList);

  const center = strokeWidth / 2;
  const right = 100 - strokeWidth / 2;
  const pathString = `M ${strokeLinecap === 'round' ? center : 0},${center}
         L ${strokeLinecap === 'round' ? right : 100},${center}`;
  const viewBoxString = `0 0 100 ${strokeWidth}`;
  let stackPtg = 0;
  return (
    <svg
      className={classNames(`${prefixCls}-line`, className)}
      viewBox={viewBoxString}
      preserveAspectRatio="none"
      style={style}
      {...restProps}
    >
      <path
        className={`${prefixCls}-line-trail`}
        d={pathString}
        strokeLinecap={strokeLinecap}
        stroke={trailColor}
        strokeWidth={trailWidth || strokeWidth}
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
        const pathStyle = {
          strokeDasharray: `${ptg * dashPercent}px, 100px`,
          strokeDashoffset: `-${stackPtg}px`,
          transition:
            transition ||
            'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
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
            ref={paths[index]}
            style={pathStyle}
          />
        );
      })}
    </svg>
  );
};

Line.defaultProps = defaultProps;

Line.displayName = 'Line';

export default Line;
