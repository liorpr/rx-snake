import React from 'react'
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "../resources/colors";

const Line = glamorous.line({
  fill: '#FFFFFF',
  strokeWidth: 8,
  strokeLinecap: 'round',
  strokeMiterlimit: 10,
});
const TransparentPath = glamorous.path({
  opacity: 0.4,
});

const HeadSvg = ({ style, direction: [x = 0, y = 0], color = SOLUTO_BLUE }) => (
  <svg x="0px" y="0px" viewBox="0 0 89 77" style={{...style, transform: `${style.transform} rotate(${x === -1 ? 180 : y * 90}deg)`}}>
    <Line stroke={color} x1="85.1" y1="57.2" x2="67.7" y2="47.2"/>
    <Line stroke={color} x1="85.1" y1="21" x2="67.7" y2="31"/>
    <path fill="#FFFFFF" d="M49.4,76.7H26.9c-14.9,0-27-12.2-27-27V27.3c0-14.8,12.1-27,27-27h22.5c14.9,0,27,12.2,27,27v22.5
				C76.4,64.6,64.3,76.7,49.4,76.7z"/>
    <TransparentPath fill={color} d="M38.2,72.2c0-6.6,5.3-11.9,11.9-11.9s11.9,5.3,11.9,11.9"/>
    <TransparentPath fill={color} d="M38.2,7.8c0,6.6,5.3,11.9,11.9,11.9s11.9-5.3,11.9-11.9"/>
    <path fill={color} d="M49.4,8.3c10.5,0,19,8.5,19,19v22.5c0,10.5-8.5,19-19,19H26.9c-10.5,0-19-8.5-19-19V27.3c0-10.5,8.5-19,19-19H49.4
					 M49.4,0.3H26.9c-14.8,0-27,12.1-27,27v22.5c0,14.9,12.2,27,27,27h22.5c14.8,0,27-12.1,27-27V27.3C76.4,12.4,64.3,0.3,49.4,0.3
					L49.4,0.3z"/>
  </svg>
);

export default HeadSvg;
