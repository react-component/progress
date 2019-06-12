/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Circle extends Component {
  getPathStyles(offset, percent, strokeColor, strokeWidth, gapDegree = 0, gapPosition, sweepFlag) {
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
     a ${radius},${radius} 0 1 ${sweepFlag} ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 ${sweepFlag} ${-endPositionX},${endPositionY}`;
    const len = Math.PI * 2 * radius;

    const pathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2 + offset / 100 * (len - gapDegree)}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s', // eslint-disable-line
    };

    return {
      pathString,
      pathStyle,
    };
  }

  getStokeList() {
    const {
      prefixCls, percent, strokeColor, strokeWidth, strokeLinecap,
      gapDegree, gapPosition, sweepFlag,
    } = this.props;
    const percentList = Array.isArray(percent) ? percent : [percent];
    const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

    let stackPtg = 0;
    return percentList.map((ptg, index) => {
      const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      const { pathString, pathStyle } = this.getPathStyles(
        stackPtg, ptg, color, strokeWidth, gapDegree, gapPosition, sweepFlag
      );

      stackPtg += ptg;

      return (
        <path
          key={index}
          className={`${prefixCls}-circle-path`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          strokeWidth={ptg === 0 ? 0 : strokeWidth}
          fillOpacity="0"
          style={pathStyle}
          ref={(path) => {
            this.paths[index] = path;
          }}
        />
      );
    });
  }

  paths = {};

  render() {
    const {
      prefixCls, strokeWidth, trailWidth,
      gapDegree, gapPosition, sweepFlag,
      trailColor, strokeLinecap, style, className, ...restProps,
    } = this.props;
    const { pathString, pathStyle } = this.getPathStyles(
      0, 100, trailColor, strokeWidth, gapDegree, gapPosition, sweepFlag
    );
    delete restProps.percent;
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
  sweepFlag: PropTypes.oneOf([0, 1]),
};

Circle.defaultProps = {
  ...defaultProps,
  gapPosition: 'top',
  sweepFlag: 1,
};

export default enhancer(Circle);
