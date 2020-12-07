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
          <G opacity="0">
            <Circle x="15" cx="30" cy="30" r="30" />
            <Circle x="40" cx="30" cy="30" r="10" />
          </G>
        </ClipPath>

        <Mask id="mask" maskUnits="userSpaceOnUse">
          <Circle x="40" cx="30" cy="30" r="10" fill="red" />
        </Mask>

        {/* <ClipPath id="clip2">
          <G>
            <Circle x="15" cx="30" cy="30" r="30" />
            <Circle x="40" cx="30" cy="30" r="10" />
          </G>
        </ClipPath> */}

        {/* <Mask id="clip">
          <Circle fill="green" x="15" cx="30" cy="30" r="10" />
        </Mask> */}
      </Defs>

      {/* <Circle x="15" cx="30" cy="30" r="30" fill="black" /> */}

      <Rect
        id="Text"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="green"
        clipPath="url(#clip)"
        clipRule="nonzero"
      />

      {/* <Use href="#Text" fill="blue" mask="url(#mask)" /> */}

      {/* <Circle x="40" cx="30" cy="30" r="10" fill="red" /> */}

      {/* <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="red"
        clipPath="url(#clip2)"
        clipRule="evenodd"
      /> */}

      {/* <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="red"
        clipPath="url(#clip)"
      /> */}
    </Svg>
  );
};
