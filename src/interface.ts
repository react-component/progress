import * as React from 'react';

export interface progressProps {
  strokeWidth?: number;
  trailWidth?: number;
  className?: string;
  percent?: number | number[];
  strokeColor?: strokeColorType;
  trailColor?: string;
  strokeLinecap?: strokeLinecapType;
  prefixCls?: string;
  style?: React.CSSProperties;
  gapDegree?: number;
  gapPosition?: gapPositionType;
  transition?: string;
}

export type strokeColorType = string | string[] | object;

export type gapPositionType = 'top' | 'right' | 'bottom' | 'left';

export type strokeLinecapType = 'round' | 'butt' | 'square';
