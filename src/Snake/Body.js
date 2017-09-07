import React from 'react'
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "../resources/colors";

const Circle = glamorous.circle({
  opacity: 0.4,
});

const BodySvg = ({ style, color = SOLUTO_BLUE }) => (
  <svg x="0px" y="0px" viewBox="0 0 77 77" style={style}>
    <path fill="#FFFFFF" d="M27.3,72.7c-12.7,0-23-10.3-23-23V27.3c0-12.7,10.3-23,23-23h22.5c12.7,0,23,10.3,23,23v22.5
			c0,12.7-10.3,23-23,23H27.3z"/>
    <path fill={color} d="M49.7,8.3c10.5,0,19,8.5,19,19v22.5c0,10.5-8.5,19-19,19H27.3c-10.5,0-19-8.5-19-19V27.3c0-10.5,8.5-19,19-19H49.7
			 M49.7,0.3H27.3c-14.9,0-27,12.2-27,27v22.5c0,14.8,12.1,27,27,27h22.5c14.8,0,27-12.2,27-27V27.3C76.7,12.4,64.6,0.3,49.7,0.3
			L49.7,0.3z"/>
    <Circle fill={color} cx="38.5" cy="38.5" r="21.8"/>
  </svg>
);

export default BodySvg;
