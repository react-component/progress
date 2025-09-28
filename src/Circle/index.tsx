import * as React from 'react';
import { clsx } from 'clsx';
import { defaultProps, useTransitionDuration } from '../common';
import type { ProgressProps } from '../interface';
import useId from '@rc-component/util/lib/hooks/useId';
import PtgCircle from './PtgCircle';
import { VIEW_BOX_SIZE, getCircleStyle } from './util';
import getIndeterminateCircle from '../utils/getIndeterminateCircle';

function toArray<T>(value: T | T[]): T[] {
  const mergedValue = value ?? [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}

const Circle: React.FC<ProgressProps> = (props) => {
  const {
    id,
    prefixCls,
    classNames = {},
    styles = {},
    steps,
    strokeWidth,
    railWidth,
    gapDegree = 0,
    gapPosition,
    railColor,
    strokeLinecap,
    style,
    className,
    strokeColor,
    percent,
    loading,
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
  const { count: stepCount, gap: stepGap } =
    typeof steps === 'object' ? steps : { count: steps, gap: 2 };

  const percentList = toArray(percent);
  const strokeColorList = toArray(strokeColor);
  const gradient = strokeColorList.find((color) => color && typeof color === 'object') as Record<
    string,
    string
  >;
  const isConicGradient = gradient && typeof gradient === 'object';
  const mergedStrokeLinecap = isConicGradient ? 'butt' : strokeLinecap;
  const { indeterminateStyleProps, indeterminateStyleAnimation } = getIndeterminateCircle({
    id: mergedId,
    loading,
  });

  const circleStyle = getCircleStyle(
    perimeter,
    perimeterWithoutGap,
    0,
    100,
    rotateDeg,
    gapDegree,
    gapPosition,
    railColor,
    mergedStrokeLinecap,
    strokeWidth,
  );

  const paths = useTransitionDuration();

  const getStokeList = () => {
    let stackPtg = 0;
    return percentList
      .map<React.ReactNode>((ptg, index) => {
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
            className={classNames.track}
            style={{ ...circleStyleForStack, ...indeterminateStyleProps, ...styles.track }}
            strokeLinecap={mergedStrokeLinecap}
            strokeWidth={strokeWidth}
            gapDegree={gapDegree}
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
    return new Array(stepCount).fill(null).map<React.ReactNode>((_, index) => {
      const color = index <= current - 1 ? strokeColorList[0] : railColor;
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
        stepGap,
      );
      stackPtg +=
        ((perimeterWithoutGap - (circleStyleForStack.strokeDashoffset as number) + stepGap) * 100) /
        perimeterWithoutGap;

      return (
        <circle
          key={index}
          className={clsx(`${prefixCls}-circle-path`, classNames.track)}
          r={radius}
          cx={halfSize}
          cy={halfSize}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={1}
          style={{ ...circleStyleForStack, ...styles.track }}
          ref={(elem) => {
            paths[index] = elem;
          }}
        />
      );
    });
  };

  return (
    <svg
      className={clsx(`${prefixCls}-circle`, classNames.root, className)}
      viewBox={`0 0 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      style={{
        ...styles.root,
        ...style,
      }}
      id={id}
      role="presentation"
      {...restProps}
    >
      {!stepCount && (
        <circle
          className={clsx(`${prefixCls}-circle-rail`, classNames.rail)}
          r={radius}
          cx={halfSize}
          cy={halfSize}
          stroke={railColor}
          strokeLinecap={mergedStrokeLinecap}
          strokeWidth={railWidth || strokeWidth}
          style={{ ...circleStyle, ...styles.rail }}
        />
      )}
      {stepCount ? getStepStokeList() : getStokeList()}
      {indeterminateStyleAnimation}
    </svg>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Circle.displayName = 'Circle';
}

export default Circle;
