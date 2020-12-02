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

export const ClipTest = () => {
  return (
    <Svg height={100} width={200} style={{ backgroundColor: '#000' }}>
      <Defs>
        <ClipPath id="clip">
          <G>
            <Circle fill="grey" x="10" cx="30" cy="30" r="30" />
            <Circle fill="grey" x="15" cx="30" cy="30" r="20" />
          </G>
        </ClipPath>
      </Defs>

      {/* <Circle fill="green" x="15" cx="30" cy="30" r="20" /> */}

      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="red"
        clipPath="url(#clip)"
      />
    </Svg>
  );
};
