import * as React from 'react';
import type { ProgressProps } from '..';
import type { StrokeColorObject } from '../interface';
import { clsx } from 'clsx';

interface BlockProps {
  bg: string;
}

const Block: React.FC<React.PropsWithChildren<BlockProps>> = ({ bg, children }) => (
  <div style={{ width: '100%', height: '100%', background: bg }}>{children}</div>
);

function getPtgColors(color: Record<string, string | boolean>, scale: number) {
  return Object.keys(color).map((key) => {
    const parsedKey = parseFloat(key);
    const ptgKey = `${Math.floor(parsedKey * scale)}%`;

    return `${color[key]} ${ptgKey}`;
  });
}

export interface ColorGradientProps {
  prefixCls: string;
  className?: string;
  gradientId: string;
  style: React.CSSProperties;
  ptg: number;
  radius: number;
  strokeLinecap: ProgressProps['strokeLinecap'];
  strokeWidth: ProgressProps['strokeWidth'];
  size: number;
  color: string | StrokeColorObject;
  gapDegree: number;
}

const PtgCircle = React.forwardRef<SVGCircleElement, ColorGradientProps>((props, ref) => {
  const {
    prefixCls,
    color,
    gradientId,
    radius,
    className,
    style: circleStyleForStack,
    ptg,
    strokeLinecap,
    strokeWidth,
    size,
    gapDegree,
  } = props;

  const isGradient = color && typeof color === 'object';

  const stroke = isGradient ? `#FFF` : undefined;

  // ========================== Circle ==========================
  const halfSize = size / 2;

  const circleNode = (
    <circle
      className={clsx(`${prefixCls}-circle-path`, className)}
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
  if (!isGradient) {
    return circleNode;
  }

  const maskId = `${gradientId}-conic`;

  const fromDeg = gapDegree ? `${180 + gapDegree / 2}deg` : '0deg';

  const conicColors = getPtgColors(color, (360 - gapDegree) / 360);
  const linearColors = getPtgColors(color, 1);

  const conicColorBg = `conic-gradient(from ${fromDeg}, ${conicColors.join(', ')})`;
  const linearColorBg = `linear-gradient(to ${gapDegree ? 'bottom' : 'top'}, ${linearColors.join(
    ', ',
  )})`;

  return (
    <>
      <mask id={maskId}>{circleNode}</mask>
      <foreignObject x={0} y={0} width={size} height={size} mask={`url(#${maskId})`}>
        <Block bg={linearColorBg}>
          <Block bg={conicColorBg} />
        </Block>
      </foreignObject>
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  PtgCircle.displayName = 'PtgCircle';
}

export default PtgCircle;
