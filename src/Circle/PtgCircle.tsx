import * as React from 'react';
import type { ProgressProps } from '..';
import type { StrokeColorType } from '../interface';

export interface ColorGradientProps {
  prefixCls: string;
  gradientId: string;
  style: React.CSSProperties;
  ptg: number;
  radius: number;
  strokeLinecap: ProgressProps['strokeLinecap'];
  strokeWidth: ProgressProps['strokeWidth'];
  size: number;
  color: StrokeColorType;
  conic: boolean;
  gapDegree: number;
}

const PtgCircle = React.forwardRef<SVGCircleElement, ColorGradientProps>((props, ref) => {
  const {
    prefixCls,
    color,
    gradientId,
    radius,
    style: circleStyleForStack,
    ptg,
    strokeLinecap,
    strokeWidth,
    size,
    conic,
    gapDegree,
  } = props;

  const isGradient = color && typeof color === 'object';

  const stroke = React.useMemo(() => {
    if (conic) {
      return '#FFF';
    }

    return isGradient ? `url(#${gradientId})` : undefined;
  }, [gradientId, isGradient, conic]);

  // ========================== Circle ==========================
  const halfSize = size / 2;

  const circleNode = (
    <circle
      className={`${prefixCls}-circle-path`}
      r={radius}
      cx={halfSize}
      cy={halfSize}
      stroke={stroke}
      strokeLinecap={strokeLinecap}
      strokeWidth={strokeWidth}
      opacity={ptg === 0 ? 0 : 1}
      style={circleStyleForStack}
      ref={ref}
    />
  );

  // ========================== Render ==========================
  if (!conic) {
    return circleNode;
  }

  const conicColorKeys = Object.keys(color).filter((key) => key !== 'conic');

  const fromDeg = gapDegree ? `${180 + gapDegree / 2}deg` : '0deg';

  const conicColors = conicColorKeys.map((key) => {
    const parsedKey = parseFloat(key);
    const ptgKey = `${gapDegree ? Math.floor((parsedKey * (360 - gapDegree)) / 360) : parsedKey}%`;

    return `${color[key]} ${ptgKey}`;
  });

  const conicColorBg = `conic-gradient(from ${fromDeg}, ${conicColors.join(', ')})`;

  return (
    <>
      <mask id="mask">{circleNode}</mask>

      <foreignObject x={0} y={0} width={size} height={size} mask="url(#mask)">
        <div style={{ width: '100%', height: '100%', background: conicColorBg }} />
      </foreignObject>
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  PtgCircle.displayName = 'PtgCircle';
}

export default PtgCircle;

/*
0% -> 50%
25% -> 75%
50% -> 100%, 0%
75% -> 25%


*/
