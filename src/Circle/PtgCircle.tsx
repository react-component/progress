import * as React from 'react';
import type { ProgressProps } from '..';

export interface ColorGradientProps {
  prefixCls: string;
  gradientId: string;
  style: React.CSSProperties;
  ptg: number;
  radius: number;
  strokeLinecap: ProgressProps['strokeLinecap'];
  strokeWidth: ProgressProps['strokeWidth'];
  size: number;
  color: string | Record<string, string>;
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
  } = props;

  const isGradient = color && typeof color === 'object';
  const isConicGradient = isGradient && Object.keys(color).some((key) => key.endsWith('deg'));

  const stroke = React.useMemo(() => {
    if (isConicGradient) {
      return '#FFF';
    }

    return isGradient ? `url(#${gradientId})` : undefined;
  }, [gradientId, isGradient, isConicGradient]);

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
  if (!isConicGradient) {
    return circleNode;
  }

  // background: conic-gradient(
  //   red 6deg, orange 6deg 18deg, yellow 18deg 45deg,
  //   green 45deg 110deg, blue 110deg 200deg, purple 200deg);

  const conicColors = Object.keys(color).map((key) => `${color[key]} ${key}`);
  const conicColorBg = `conic-gradient(${conicColors.join(', ')})`;

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
