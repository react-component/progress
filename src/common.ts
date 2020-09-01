import { useRef, useEffect } from 'react';
import { ProgressProps } from './interface';

export const defaultProps: Partial<ProgressProps> = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1,
};

export const useTransitionDuration = (percentList: number[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const paths = percentList.map(() => useRef());
  const prevTimeStamp = useRef(null);
  useEffect(() => {
    const now = Date.now();
    let updated = false;

    Object.keys(paths).forEach(key => {
      const path = paths[key].current;
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

  return [paths];
};
