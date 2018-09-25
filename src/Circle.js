/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Circle extends Component {
  getPathStyles() {
    const { percent, strokeWidth, strokeColor, gapDegree = 0, gapPosition } = this.props;
    const radius = 50 - (strokeWidth / 2);
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
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
    };
    const strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s', // eslint-disable-line
    };
    return { pathString, trailPathStyle, strokePathStyle };
  }

  render() {
    const {
      prefixCls, strokeWidth, trailWidth, percent,
      trailColor, strokeLinecap, style, className, ...restProps,
    } = this.props;
    const { pathString, trailPathStyle, strokePathStyle } = this.getPathStyles();
    delete restProps.percent;
    delete restProps.gapDegree;
    delete restProps.gapPosition;
    delete restProps.strokeColor;
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
          strokeWidth={this.props.percent === 0 ? 0 : strokeWidth}
          fillOpacity="0"
          ref={(path) => { this.path = path; }}
          style={strokePathStyle}
        />
      </svg>
    );
  }
}

Circle.propTypes = {
  ...propTypes,
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

Circle.defaultProps = {
  ...defaultProps,
  gapPosition: 'top',
};

export default enhancer(Circle);
