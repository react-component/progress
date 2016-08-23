import React from 'react';
import { defaultProps, propTypes } from './props';

export default React.createClass({
  propTypes,
  getDefaultProps() {
    return defaultProps;
  },
  render() {
    const {
      prefixCls, strokeWidth, trailWidth, strokeColor,
      trailColor, strokeLinecap, percent, style, className,
      ...restProps,
    } = this.props;

    const pathStyle = {
      strokeDasharray: '100px, 100px',
      strokeDashoffset: `${(100 - percent)}px`,
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s linear',
    };

    const center = strokeWidth / 2;
    const right = (100 - strokeWidth / 2);
    const pathString = `M ${center},${center} L ${right},${center}`;
    const viewBoxString = `0 0 100 ${strokeWidth}`;

    return (
      <svg
        className={`${prefixCls}-line ${className}`}
        viewBox={viewBoxString}
        preserveAspectRatio="none"
        style={style}
        {...restProps}
      >
        <path
          className={`${prefixCls}-line-trail`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={trailColor}
          strokeWidth={trailWidth || strokeWidth}
          fillOpacity="0"
        />
        <path
          className={`${prefixCls}-line-path`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fillOpacity="0"
          style={pathStyle}
        />
      </svg>
    );
  },
});
