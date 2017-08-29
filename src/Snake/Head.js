import React from 'react'
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "../resources/colors";

const Line = glamorous.line(({ color = SOLUTO_BLUE }) => ({
  fill: '#FFFFFF',
  stroke: color,
  strokeWidth: 8,
  strokeLinecap: 'round',
  strokeMiterlimit: 10,
}));
const Path = glamorous.path(({ color = SOLUTO_BLUE }) => ({ fill: color }));
const TransparentPath = glamorous.path(({ color = SOLUTO_BLUE }) => ({
  fill: color,
  opacity: 0.4,
}));
const Svg = glamorous.svg(({ direction: [x, y]}) => ({
  transform: `rotate(${x === -1 ? 180 : y * 90}deg)`,
}));

const HeadSvg = ({ style, direction, color }) => (
  <Svg x="0px" y="0px" viewBox="0 0 89 77" direction={direction} style={style}>
    <g>
      <g>
        <Line color={color} x1="85.1" y1="57.2" x2="67.7" y2="47.2"/>
        <Line color={color} x1="85.1" y1="21" x2="67.7" y2="31"/>
        <g>
          <Path color="#FFFFFF" d="M49.4,76.7H26.9c-14.9,0-27-12.2-27-27V27.3c0-14.8,12.1-27,27-27h22.5c14.9,0,27,12.2,27,27v22.5
				C76.4,64.6,64.3,76.7,49.4,76.7z"/>
        </g>
        <TransparentPath d="M38.2,72.2c0-6.6,5.3-11.9,11.9-11.9s11.9,5.3,11.9,11.9"/>
        <TransparentPath d="M38.2,7.8c0,6.6,5.3,11.9,11.9,11.9s11.9-5.3,11.9-11.9"/>
        <g>
          <Path color={color} d="M49.4,8.3c10.5,0,19,8.5,19,19v22.5c0,10.5-8.5,19-19,19H26.9c-10.5,0-19-8.5-19-19V27.3c0-10.5,8.5-19,19-19H49.4
					 M49.4,0.3H26.9c-14.8,0-27,12.1-27,27v22.5c0,14.9,12.2,27,27,27h22.5c14.8,0,27-12.1,27-27V27.3C76.4,12.4,64.3,0.3,49.4,0.3
					L49.4,0.3z"/>
        </g>
      </g>
    </g>
  </Svg>
);

export default HeadSvg;
