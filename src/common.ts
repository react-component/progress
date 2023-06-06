import { useRef, useEffect } from 'react';
import type { ProgressProps } from './interface';

export const defaultProps: Partial<ProgressProps> = {
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  trailColor: '#D9D9D9',
  trailWidth: 1,
  gapPosition: 'bottom',
};

export const useTransitionDuration = (): SVGPathElement[] => {
  const pathsRef = useRef<SVGPathElement[]>([]);
  const prevTimeStamp = useRef(null);

  useEffect(() => {
    const now = Date.now();
    let updated = false;

    pathsRef.current.forEach((path) => {
      if (!path) {
        return;
      }

      updated = true;
      const pathStyle = path.style;
      pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

      if (prevTimeStamp.current && now - prevTimeStamp.current < 100) {
        pathStyle.transitionDuration = '0s, 0s';
      }
    });

    if (updated) {
      prevTimeStamp.current = Date.now();
    }
  });

  return pathsRef.current;
};
