import type { StrokeColorType } from '../interface';
import type { ProgressProps } from '..';
import type React from 'react';

export const VIEW_BOX_SIZE = 100;

export const getCircleStyle = (
  perimeter: number,
  perimeterWithoutGap: number,
  offset: number,
  percent: number,
  rotateDeg: number,
  gapDegree: number,
  gapPosition: ProgressProps['gapPosition'] | undefined,
  strokeColor: StrokeColorType,
  strokeLinecap: ProgressProps['strokeLinecap'],
  strokeWidth: number,
  stepSpace = 0,
): React.CSSProperties => {
  const offsetDeg = (offset / 100) * 360 * ((360 - gapDegree) / 360);
  const positionDeg =
    gapDegree === 0
      ? 0
      : {
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
    // when percent is small enough (<= 1%), keep smallest value to avoid it's disappearance
    if (strokeDashoffset >= perimeterWithoutGap) {
      strokeDashoffset = perimeterWithoutGap - 0.01;
    }
  }

  const halfSize = VIEW_BOX_SIZE / 2;

  return {
    stroke: typeof strokeColor === 'string' ? strokeColor : undefined,
    strokeDasharray: `${perimeterWithoutGap}px ${perimeter}`,
    strokeDashoffset: strokeDashoffset + stepSpace,
    transform: `rotate(${rotateDeg + offsetDeg + positionDeg}deg)`,
    transformOrigin: `${halfSize}px ${halfSize}px`,
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
    fillOpacity: 0,
  };
};
