/* eslint-disable react/prop-types */
import React, { PropTypes } from 'react';
import mixin from './mixin';

export default React.createClass({
  propTypes: {
    gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  },
  mixins: [mixin],

  render() {
    const {
      prefixCls, strokeWidth, trailWidth, strokeColor,
      trailColor, strokeLinecap, percent, style, className,
      gapWidth = 0, gapPosition,
      ...restProps,
    } = this.props;

    const radius = (50 - strokeWidth / 2);
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = -2 * radius;
    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;
      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;
      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;
      default:
    }
    const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
    const len = Math.PI * 2 * radius;
    const trailPathStyle = {
      strokeDasharray: `${len - gapWidth}px ${len}px`,
      strokeDashoffset: `-${gapWidth / 2}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease',
    };

    const strokePathStyle = {
      strokeDasharray: `${percent / 100 * (len - gapWidth)}px ${len}px`,
      strokeDashoffset: `-${gapWidth / 2}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease',
    };
    return (
      <svg
        className={`${prefixCls}-circle ${className}`}
        viewBox="0 0 100 100"
        style={style}
        {...restProps}
      >
        <path
          className={`${prefixCls}-circle-trail`}
          d={pathString}
          stroke={trailColor}
          strokeWidth={trailWidth || strokeWidth}
          fillOpacity="0"
          style={trailPathStyle}
        />
        <path
          className={`${prefixCls}-circle-path`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fillOpacity="0"
          ref={(path) => {
            this.path = path;
          }}
          style={strokePathStyle}
        />
      </svg>
    );
  },
});
