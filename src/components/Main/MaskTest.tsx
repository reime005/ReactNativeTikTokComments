import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Rect,
  Text,
  Use,
  Circle,
} from 'react-native-svg';

export const MaskTest = () => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 800 300">
      <Defs>
        <LinearGradient
          id="Gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="800"
          y2="0">
          <Stop offset="0" stopColor="white" stopOpacity="0" />
          <Stop offset="1" stopColor="white" stopOpacity="1" />
        </LinearGradient>
        <Mask
          id="Mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="800"
          height="300">
          <Rect x="0" y="0" width="800" height="300" fill="url(#Gradient)" />
        </Mask>
        {/* <Text
          id="Text"
          x="400"
          y="200"
          fontFamily="Verdana"
          fontSize="100"
          textAnchor="middle">
          Masked text
        </Text> */}
        <Circle id="Text" cx="30" cy="30" r="30" fill="green" />
      </Defs>
      <Rect x="0" y="0" width="800" height="300" fill="#FF8080" />
      <Use href="#Text" fill="blue" mask="url(#Mask)" />
      <Use href="#Text" fill="none" stroke="black" stroke-width="2" />
    </Svg>
  );
};
