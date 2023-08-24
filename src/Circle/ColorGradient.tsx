import * as React from 'react';

function stripPercentToNumber(percent: string) {
  return +percent.replace('%', '');
}

export interface ColorGradientProps {
  gradientId: string;
  gradient?: Record<string, string>;
}

export default function ColorGradient(props: ColorGradientProps) {
  const { gradientId, gradient } = props;

  if (gradient && Object.keys(gradient).some((key) => key.endsWith('deg'))) {
    return null;
  }

  return (
    <defs>
      <linearGradient id={gradientId} x1="100%" y1="0%" x2="0%" y2="0%">
        {Object.keys(gradient)
          .sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b))
          .map((key, index) => (
            <stop key={index} offset={key} stopColor={gradient[key]} />
          ))}
      </linearGradient>
    </defs>
  );
}
