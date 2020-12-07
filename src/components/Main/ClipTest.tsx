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
  RadialGradient,
  ClipPath,
  G,
  Ellipse,
  Polygon,
} from 'react-native-svg';
/**
 * 1/ circle black BG + clip
 * 2/ red circle
 * 3/ transparent bg
 */
export const ClipTest = () => {
  return (
    <Svg
      height={24}
      width={48}
      {...props}
      viewBox="0 0 48 24"
      style={{ backgroundColor: 'transparent', alignSelf: 'center' }}>
      <Defs>
        <ClipPath id="clip">
          <G opacity="0">
            <Circle x="0" cx="30" cy="30" r="30" />
            <Circle x="0" cx="30" cy="30" r="10" />
          </G>
        </ClipPath>
      </Defs>

      <Circle x="55" cx="30" cy="30" r="10" fill="rgb(235, 91, 93)" />

      <Circle x="15" cx="30" cy="30" r="30" fill="#000" />

      <Circle
        x="15"
        cx="30"
        cy="30"
        r="30"
        fill="rgb(91, 232, 235)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
};
