/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

let gradientSeed = 0;

function stripPercentToNumber(percent) {
  return +percent.replace('%', '');
}

function toArray(symArray) {
  return Array.isArray(symArray) ? symArray : [symArray];
}

function getPathStyles(offset, percent, strokeColor, strokeWidth, gapDegree = 0, gapPosition) {
  const radius = 50 - strokeWidth / 2;
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

  const pathStyle = {
    stroke: strokeColor,
    strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
    strokeDashoffset: `-${gapDegree / 2 + (offset / 100) * (len - gapDegree)}px`,
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s', // eslint-disable-line
  };

  return {
    pathString,
    pathStyle,
  };
}

class Circle extends Component {
  paths = {};

  gradientId = 0;

  constructor() {
    super();
    this.gradientId = gradientSeed;
    gradientSeed += 1;
  }

  getStokeList() {
    const {
      prefixCls,
      percent,
      strokeColor,
      strokeWidth,
      strokeLinecap,
      gapDegree,
      gapPosition,
    } = this.props;
    const percentList = toArray(percent);
    const strokeColorList = toArray(strokeColor);

    let stackPtg = 0;
    return percentList.map((ptg, index) => {
      const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      const stroke =
        Object.prototype.toString.call(color) === '[object Object]'
          ? `url(#${prefixCls}-gradient-${this.gradientId})`
          : '';
      const { pathString, pathStyle } = getPathStyles(
        stackPtg,
        ptg,
        color,
        strokeWidth,
        gapDegree,
        gapPosition,
      );

      stackPtg += ptg;

      return (
        <path
          key={index}
          className={`${prefixCls}-circle-path`}
          d={pathString}
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
          opacity={ptg === 0 ? 0 : 1}
          fillOpacity="0"
          style={pathStyle}
          ref={path => {
            this.paths[index] = path;
          }}
        />
      );
    });
  }

  render() {
    const {
      prefixCls,
      strokeWidth,
      trailWidth,
      gapDegree,
      gapPosition,
      trailColor,
      strokeLinecap,
      style,
      className,
      strokeColor,
      ...restProps
    } = this.props;
    const { pathString, pathStyle } = getPathStyles(
      0,
      100,
      trailColor,
      strokeWidth,
      gapDegree,
      gapPosition,
    );
    delete restProps.percent;
    const strokeColorList = toArray(strokeColor);
    const gradient = strokeColorList.find(
      color => Object.prototype.toString.call(color) === '[object Object]',
    );

    return (
      <svg
        className={`${prefixCls}-circle ${className}`}
        viewBox="0 0 100 100"
        style={style}
        {...restProps}
      >
        {gradient && (
          <defs>
            <linearGradient
              id={`${prefixCls}-gradient-${this.gradientId}`}
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              {Object.keys(gradient)
                .sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b))
                .map((key, index) => (
                  <stop key={index} offset={key} stopColor={gradient[key]} />
                ))}
            </linearGradient>
          </defs>
        )}
        <path
          className={`${prefixCls}-circle-trail`}
          d={pathString}
          stroke={trailColor}
          strokeLinecap={strokeLinecap}
          strokeWidth={trailWidth || strokeWidth}
          fillOpacity="0"
          style={pathStyle}
        />
        {this.getStokeList().reverse()}
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
