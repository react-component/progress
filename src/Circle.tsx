import * as React from 'react';
import classNames from 'classnames';
import { useTransitionDuration, defaultProps } from './common';
import type { ProgressProps, GapPositionType } from './interface';

let gradientSeed = 0;

function pxToNumber(px: string) {
  return parseInt(px.slice(0, px.indexOf('p')), 10);
}

function stripPercentToNumber(percent: string) {
  return +percent.replace('%', '');
}

function toArray(symArray: any) {
  return Array.isArray(symArray) ? symArray : [symArray];
}

function getPathStyles(
  offset: number,
  percent: number,
  strokeColor: string,
  strokeWidth: number,
  gapDegree = 0,
  gapPosition: GapPositionType,
) {
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
    stroke: typeof strokeColor === 'string' ? strokeColor : undefined,
    strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
    strokeDashoffset: `-${gapDegree / 2 + (offset / 100) * (len - gapDegree)}px`,
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s', // eslint-disable-line
  };

  return {
    pathString,
    pathStyle,
  };
}

const Circle: React.FC<ProgressProps> = ({
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
  percent,
  dot,
  ...restProps
}) => {
  const gradientId = React.useMemo(() => {
    gradientSeed += 1;
    return gradientSeed;
  }, []);
  const { pathString, pathStyle } = getPathStyles(
    0,
    100,
    trailColor,
    strokeWidth,
    gapDegree,
    gapPosition,
  );
  const percentList = toArray(percent);
  const strokeColorList = toArray(strokeColor);
  const gradient = strokeColorList.find(
    (color) => Object.prototype.toString.call(color) === '[object Object]',
  );

  const [paths] = useTransitionDuration(percentList);

  const getDotList = (pathDoms) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (dot) {
      return pathDoms.map((pathDom, index) => {
        const strokeDasharrayTemp = pathDom.props.style.strokeDasharray;
        const strokeLength =
          pxToNumber(strokeDasharrayTemp.slice(0, strokeDasharrayTemp.indexOf(' '))) +
          Math.abs(pxToNumber(pathDom.props.style.strokeDashoffset)) +
          strokeWidth / 2;

        path.setAttribute('d', pathDom.props.d);
        const dotPoint = path.getPointAtLength(strokeLength);
        return (
          <circle
            key={index + 10}
            className={`${prefixCls}-circle-dot`}
            cx={dotPoint.x}
            cy={dotPoint.y}
            r={typeof dot === 'object' ? dot.size : strokeWidth}
            fill={pathDom.props.stroke ? pathDom.props.stroke : pathDom.props.style.stroke}
          />
        );
      });
    } 
      return [];
    
  };

  const getStokeList = () => {
    let stackPtg = 0;
    const pathDoms = percentList
      .map((ptg, index) => {
        const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        const stroke =
          Object.prototype.toString.call(color) === '[object Object]'
            ? `url(#${prefixCls}-gradient-${gradientId})`
            : '';
        const pathStyles = getPathStyles(stackPtg, ptg, color, strokeWidth, gapDegree, gapPosition);
        stackPtg += ptg;
        return (
          <path
            key={index}
            className={`${prefixCls}-circle-path`}
            d={pathStyles.pathString}
            stroke={stroke}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
            opacity={ptg === 0 ? 0 : 1}
            fillOpacity="0"
            style={pathStyles.pathStyle}
            ref={paths[index]}
          />
        );
      })
      .reverse();
    return pathDoms.concat(getDotList(pathDoms));
  };

  return (
    <svg
      className={classNames(`${prefixCls}-circle`, className)}
      viewBox="0 0 100 100"
      style={style}
      {...restProps}
    >
      {gradient && (
        <defs>
          <linearGradient
            id={`${prefixCls}-gradient-${gradientId}`}
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
      {getStokeList()}
    </svg>
  );
};

Circle.defaultProps = defaultProps;

Circle.displayName = 'Circle';

export default Circle;
