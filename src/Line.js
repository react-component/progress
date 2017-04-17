import React, { Component } from 'react';

import { propTypes, defaultProps } from './types';

class Line extends Component {
  componentDidUpdate() {
    const now = Date.now();
    this.path.style.transitionDuration = '0.3s, 0.3s';
    if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
      this.path.style.transitionDuration = '0s, 0s';
    }
    this.prevTimeStamp = Date.now();
  }

  render() {
    const {
      className,
      percent,
      prefixCls,
      strokeColor,
      strokeLinecap,
      strokeWidth,
      style,
      trailColor,
      trailWidth,
      ...restProps,
    } = this.props;

    const pathStyle = {
      strokeDasharray: '100px, 100px',
      strokeDashoffset: `${(100 - percent)}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear',
    };

    const center = strokeWidth / 2;
    const right = 100 - (strokeWidth / 2);
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
          ref={(path) => { this.path = path; }}
          style={pathStyle}
        />
      </svg>
    );
  }
}

Line.propTypes = {
  ...propTypes,
};

Line.defaultProps = {
  ...defaultProps,
};

export default Line;
