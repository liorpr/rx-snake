import React from 'react'
import glamorous from 'glamorous';
import { SOLUTO_BLUE } from "../resources/colors";

const Svg = glamorous.svg({ enableBackground: 'new 0 0 91 91' });
const Path = glamorous.path(({ color = SOLUTO_BLUE }) => ({ fill: color }));
const Circle = glamorous.circle(({ color = SOLUTO_BLUE }) => ({
  fill: color,
  opacity: 0.4,
}));

const BellySvg = ({ style, color }) => (
  <Svg x="0px" y="0px" viewBox="0 0 91 91" style={style}>
    <g>
      <g>
        <Path color="#FFFFFF" d="M38.7,87.1c-19.2,0-34.8-15.6-34.8-34.8V38.7c0-19.2,15.6-34.8,34.8-34.8h13.6c19.2,0,34.8,15.6,34.8,34.8
			v13.6c0,19.2-15.6,34.8-34.8,34.8H38.7z"/>
        <Path color={color} d="M52.3,7.9c17,0,30.8,13.8,30.8,30.8v13.6c0,17-13.8,30.8-30.8,30.8H38.7c-17,0-30.8-13.8-30.8-30.8V38.7
			c0-17,13.8-30.8,30.8-30.8H52.3 M52.3-0.1H38.7C17.3-0.1-0.1,17.3-0.1,38.7v13.6c0,21.5,17.4,38.8,38.8,38.8h13.6
			c21.5,0,38.8-17.4,38.8-38.8V38.7C91.1,17.3,73.7-0.1,52.3-0.1L52.3-0.1z"/>
      </g>
      <Circle color={color} cx="45.5" cy="45.5" r="33.7"/>
    </g>
  </Svg>
);

export default BellySvg;
