import React, { Component } from 'react';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Line extends Component {
  paths = {};

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

    delete restProps.gapPosition;

    const percentList = Array.isArray(percent) ? percent : [percent];
    const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

    const center = strokeWidth / 2;
    const right = 100 - (strokeWidth / 2);
    const pathString =
          `M ${strokeLinecap === 'round' ? center : 0},${center}
           L ${strokeLinecap === 'round' ? right : 100},${center}`;
    const viewBoxString = `0 0 100 ${strokeWidth}`;

    let stackPtg = 0;

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
        {percentList.map((ptg, index) => {
          const pathStyle = {
            strokeDasharray: `${ptg}px, 100px`,
            strokeDashoffset: `-${stackPtg}px`,
            transition:
              'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
          };
          const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];

          stackPtg += ptg;

          return (
            <path
              key={index}
              className={`${prefixCls}-line-path`}
              d={pathString}
              strokeLinecap={strokeLinecap}
              stroke={color}
              strokeWidth={strokeWidth}
              fillOpacity="0"
              ref={(path) => {
                this.paths[index] = path;
              }}
              style={pathStyle}
            />
          );
        })}
      </svg>
    );
  }
}

Line.propTypes = propTypes;

Line.defaultProps = defaultProps;

export default enhancer(Line);
