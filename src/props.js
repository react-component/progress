import { PropTypes } from 'react';

export const defaultProps = {
  prefixCls: 'rc-progress',
  strokeWidth: 1,
  strokeColor: '#2db7f5',
  trailWidth: 1,
  trailColor: '#D9D9D9',
  strokeLinecap: 'round',
  className: '',
};

export const propTypes = {
  prefixCls: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeColor: PropTypes.string,
  trailWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  trailColor: PropTypes.string,
  strokeLinecap: PropTypes.oneOf(['round', 'square']),
  style: PropTypes.object,
  className: PropTypes.string,
};
