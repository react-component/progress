import * as React from 'react';
import classNames from 'classnames';
import { useTransitionDuration, defaultProps } from './common';
import type { ProgressProps } from './interface';
import useId from './hooks/useId';

function stripPercentToNumber(percent: string) {
  return +percent.replace('%', '');
}

function toArray<T>(value: T | T[]): T[] {
  const mergedValue = value ?? [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}

const VIEW_BOX_SIZE = 100;

const getCircleStyle = (
  radius: number,
  offset: number,
  percent: number,
  strokeColor: string | Record<string, string>,
  gapDegree = 0,
  gapPosition: ProgressProps['gapPosition'],
  strokeLinecap: ProgressProps['strokeLinecap'],
  strokeWidth,
) => {
  const rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
  const perimeter = Math.PI * 2 * radius;
  const perimeterWithoutGap = perimeter * ((360 - gapDegree) / 360);
  const offsetDeg = (offset / 100) * 360 * ((360 - gapDegree) / 360);

  const positionDeg = {
    bottom: 0,
    top: 180,
    left: 90,
    right: -90,
  }[gapPosition];

  let strokeDashoffset = ((100 - percent) / 100) * perimeterWithoutGap;
  // Fix percent accuracy when strokeLinecap is round
  // https://github.com/ant-design/ant-design/issues/35009
  if (strokeLinecap === 'round' && percent !== 100) {
    strokeDashoffset += strokeWidth / 2;
    // when percent is small enough (<= 1%), keep smallest value to avoid it's disapperance
    if (strokeDashoffset >= perimeterWithoutGap) {
      strokeDashoffset = perimeterWithoutGap - 0.01;
    }
  }

  return {
    stroke: typeof strokeColor === 'string' ? strokeColor : undefined,
    strokeDasharray: `${perimeterWithoutGap}px ${perimeter}`,
    strokeDashoffset,
    transform: `rotate(${rotateDeg + offsetDeg + positionDeg}deg)`,
    transformOrigin: '50% 50%',
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
    fillOpacity: 0,
  };
};

const Circle: React.FC<ProgressProps> = ({
  id,
  prefixCls,
  strokeWidth,
  trailWidth,
  gapDegree,
  gapPosition,
  trailColor,
  strokeLinecap,
  style,
  className,
  strokeColor,
  percent,
  ...restProps
}) => {
  const mergedId = useId(id);
  const gradientId = `${mergedId}-gradient`;
  const radius = VIEW_BOX_SIZE / 2 - strokeWidth / 2;

  const circleStyle = getCircleStyle(
    radius,
    0,
    100,
    trailColor,
    gapDegree,
    gapPosition,
    strokeLinecap,
    strokeWidth,
  );
  const percentList = toArray(percent);
  const strokeColorList = toArray(strokeColor);
  const gradient = strokeColorList.find((color) => color && typeof color === 'object');

  const [paths] = useTransitionDuration(percentList);

  const getStokeList = () => {
    let stackPtg = 0;
    return percentList
      .map((ptg, index) => {
        const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        const stroke = color && typeof color === 'object' ? `url(#${gradientId})` : undefined;
        const circleStyleForStack = getCircleStyle(
          radius,
          stackPtg,
          ptg,
          color,
          gapDegree,
          gapPosition,
          strokeLinecap,
          strokeWidth,
        );
        stackPtg += ptg;
        return (
          <circle
            key={index}
            className={`${prefixCls}-circle-path`}
            r={radius}
            cx={VIEW_BOX_SIZE / 2}
            cy={VIEW_BOX_SIZE / 2}
            stroke={stroke}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
            opacity={ptg === 0 ? 0 : 1}
            style={circleStyleForStack}
            ref={paths[index]}
          />
        );
      })
      .reverse();
  };

  return (
    <svg
      className={classNames(`${prefixCls}-circle`, className)}
      viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      style={style}
      id={id}
      {...restProps}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="0%">
            {Object.keys(gradient)
              .sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b))
              .map((key, index) => (
                <stop key={index} offset={key} stopColor={gradient[key]} />
              ))}
          </linearGradient>
        </defs>
      )}
      <circle
        className={`${prefixCls}-circle-trail`}
        r={radius}
        cx={VIEW_BOX_SIZE / 2}
        cy={VIEW_BOX_SIZE / 2}
        stroke={trailColor}
        strokeLinecap={strokeLinecap}
        strokeWidth={trailWidth || strokeWidth}
        style={circleStyle}
      />
      {getStokeList()}
    </svg>
  );
};

Circle.defaultProps = defaultProps;

Circle.displayName = 'Circle';

export default Circle;
