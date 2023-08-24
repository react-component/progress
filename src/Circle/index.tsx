import * as React from 'react';
import classNames from 'classnames';
import { defaultProps, useTransitionDuration } from '../common';
import type { ProgressProps } from '../interface';
import useId from '../hooks/useId';
import ColorGradient from './ColorGradient';
import PtgCircle from './PtgCircle';
import { VIEW_BOX_SIZE, getCircleStyle, isConicColor } from './util';

function toArray<T>(value: T | T[]): T[] {
  const mergedValue = value ?? [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}

const Circle: React.FC<ProgressProps> = (props) => {
  const {
    id,
    prefixCls,
    steps,
    strokeWidth,
    trailWidth,
    gapDegree = 0,
    gapPosition,
    trailColor,
    strokeLinecap,
    style,
    className,
    strokeColor,
    percent,
    ...restProps
  } = {
    ...defaultProps,
    ...props,
  };

  const halfSize = VIEW_BOX_SIZE / 2;

  const mergedId = useId(id);
  const gradientId = `${mergedId}-gradient`;
  const radius = halfSize - strokeWidth / 2;
  const perimeter = Math.PI * 2 * radius;
  const rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
  const perimeterWithoutGap = perimeter * ((360 - gapDegree) / 360);
  const { count: stepCount, space: stepSpace } =
    typeof steps === 'object' ? steps : { count: steps, space: 2 };

  const percentList = toArray(percent);
  const strokeColorList = toArray(strokeColor);
  const gradient = strokeColorList.find((color) => color && typeof color === 'object') as Record<
    string,
    string
  >;
  const isConicGradient = isConicColor(gradient);
  const mergedStrokeLinecap = isConicGradient ? 'butt' : strokeLinecap;

  const circleStyle = getCircleStyle(
    perimeter,
    perimeterWithoutGap,
    0,
    100,
    rotateDeg,
    gapDegree,
    gapPosition,
    trailColor,
    mergedStrokeLinecap,
    strokeWidth,
  );

  const paths = useTransitionDuration();

  const getStokeList = () => {
    let stackPtg = 0;
    return percentList
      .map((ptg, index) => {
        const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        const circleStyleForStack = getCircleStyle(
          perimeter,
          perimeterWithoutGap,
          stackPtg,
          ptg,
          rotateDeg,
          gapDegree,
          gapPosition,
          color,
          mergedStrokeLinecap,
          strokeWidth,
        );
        stackPtg += ptg;

        return (
          <PtgCircle
            key={index}
            color={color}
            ptg={ptg}
            radius={radius}
            prefixCls={prefixCls}
            gradientId={gradientId}
            style={circleStyleForStack}
            strokeLinecap={mergedStrokeLinecap}
            strokeWidth={strokeWidth}
            conic={isConicGradient}
            ref={(elem) => {
              // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
              // React will call the ref callback with the DOM element when the component mounts,
              // and call it with `null` when it unmounts.
              // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.

              paths[index] = elem;
            }}
            size={VIEW_BOX_SIZE}
          />
        );
      })
      .reverse();
  };

  const getStepStokeList = () => {
    // only show the first percent when pass steps
    const current = Math.round(stepCount * (percentList[0] / 100));
    const stepPtg = 100 / stepCount;

    let stackPtg = 0;
    return new Array(stepCount).fill(null).map((_, index) => {
      const color = index <= current - 1 ? strokeColorList[0] : trailColor;
      const stroke = color && typeof color === 'object' ? `url(#${gradientId})` : undefined;
      const circleStyleForStack = getCircleStyle(
        perimeter,
        perimeterWithoutGap,
        stackPtg,
        stepPtg,
        rotateDeg,
        gapDegree,
        gapPosition,
        color,
        'butt',
        strokeWidth,
        stepSpace,
      );
      stackPtg +=
        ((perimeterWithoutGap - circleStyleForStack.strokeDashoffset + stepSpace) * 100) /
        perimeterWithoutGap;

      return (
        <circle
          key={index}
          className={`${prefixCls}-circle-path`}
          r={radius}
          cx={halfSize}
          cy={halfSize}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={1}
          style={circleStyleForStack}
          ref={(elem) => {
            paths[index] = elem;
          }}
        />
      );
    });
  };

  return (
    <svg
      className={classNames(`${prefixCls}-circle`, className)}
      viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      style={style}
      id={id}
      role="presentation"
      {...restProps}
    >
      {/* Line Gradient */}
      {gradient && !isConicGradient && (
        <ColorGradient gradientId={gradientId} gradient={gradient} />
      )}
      {!stepCount && (
        <circle
          className={`${prefixCls}-circle-trail`}
          r={radius}
          cx={halfSize}
          cy={halfSize}
          stroke={trailColor}
          strokeLinecap={mergedStrokeLinecap}
          strokeWidth={trailWidth || strokeWidth}
          style={circleStyle}
        />
      )}
      {stepCount ? getStepStokeList() : getStokeList()}
    </svg>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Circle.displayName = 'Circle';
}

export default Circle;
