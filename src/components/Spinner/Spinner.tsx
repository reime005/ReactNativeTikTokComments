import React from 'react';
import * as RN from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateNode,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, {
  Circle as C,
  ClipPath,
  Defs,
  EMaskUnits,
  G,
  LinearGradient,
  Mask,
  RadialGradient,
  Rect,
  Stop,
  Use,
} from 'react-native-svg';
import { useTheme } from 'styled-components';

const Circle = Animated.createAnimatedComponent(C);

const radius = 10;

const DISTANCE = 10;
const SPEED_FACTOR = 0.05;

const MAX_SCALE = 1;
const MIN_SCALE = 0.5;

const initialPositions = {
  first: radius + radius * 0.2,
  second: radius * 3 + radius * 0.2,
};

interface Props {
  height?: string | number;
  width?: string | number;
  fill?: string;
  style?: RN.ViewStyle;
}

export const Spinner = (props: Props) => {
  const { mainFont: fill } = useTheme();

  const frameRef = React.useRef<any>(null);
  const currTime = useSharedValue(0);

  const firstRadius = useSharedValue(radius);
  const secondRadius = useSharedValue(radius);

  const x = {
    first: useSharedValue(initialPositions.first),
    second: useSharedValue(initialPositions.second),
  };

  const firstProps = useAnimatedProps(() => {
    const s = Math.sin(currTime.value);

    x.first.value = interpolate(
      s,
      [-1, 1],
      [initialPositions.first, initialPositions.second],
    );

    firstRadius.value = interpolate(
      s,
      [-1, -0.7, 0, 0.7, 1],
      [radius * 0.8, radius * 0.9, radius * 1.1, radius * 0.9, radius * 0.8],
    );

    return {
      cx: x.first.value,
      r: firstRadius.value,
    };
  });

  const secondProps = useAnimatedProps(() => {
    const s = Math.sin(currTime.value);

    x.second.value = interpolate(
      s,
      [1, -1],
      [initialPositions.first, initialPositions.second],
    );

    secondRadius.value = interpolate(
      s,
      [-1, -0.5, 0, 0.5, 1],
      [radius * 0.8, radius * 0.8, radius * 0.5, radius * 0.8, radius * 0.8],
    );

    return {
      cx: x.second.value,
      r: secondRadius.value,
    };
  });

  const req = React.useCallback(() => {
    // x.second.value = radius * 2 + radius * Math.sin(currTime.value - 1);
    currTime.value = currTime.value + SPEED_FACTOR;

    frameRef.current = requestAnimationFrame(req);
  }, [x, currTime]);

  React.useEffect(() => {
    req();

    return () => cancelAnimationFrame(frameRef.current);
  }, [req]);

  return (
    <Svg width="100%" height="100%" viewBox="0 0 48 24">
      <Defs>
        {/* <LinearGradient
      id="Gradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2="48"
      y2="0"
    >
      <Stop offset="0" stopColor="white" stopOpacity="0" />
      <Stop offset="1" stopColor="white" stopOpacity="1" />
    </LinearGradient>

        <Mask
          id="Mask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="24">
          <Rect x="0" y="0" width={48} height={24} fill="url(#Gradient)" />
        </Mask> */}
<RadialGradient
      id="grad"
      cx="50%"
      cy="50%"
      rx="50%"
      ry="50%"
      fx="50%"
      fy="50%"
      gradientUnits="userSpaceOnUse"
    >
      <Stop offset="0%" stopColor="#ff0" stopOpacity="1" />
      <Stop offset="100%" stopColor="red" stopOpacity="1" />
    </RadialGradient>
        <ClipPath id="clip">
          {/* <G scale="0.9" x="10"> */}
            <Circle
              cy={radius + 2}
              r={radius}
              {...props}
              animatedProps={secondProps}
            />
          {/* </G> */}
        </ClipPath>
      </Defs>

      <Rect x="0" y="0" width="48" height="24" fill="#000" />
      <Circle
        cy={radius + 2}
        r={radius}
        // fill={'red'}
        fill="url(#grad)"
        clipPath="url(#clip)"
        {...props}
        animatedProps={firstProps}
      />

      {/* <Use href="#Circle" fill="yellow" mask="url(#Mask)" />
      <Use href="#Circle" fill="none" stroke="#000" strokeWidth={0} /> */}
    </Svg>

    // <Svg
    //   height={24}
    //   width={48}
    //   {...props}
    //   viewBox="0 0 48 24"
    //   style={{ backgroundColor: 'transparent', alignSelf: 'center' }}>
    //   <Defs>
    //     <LinearGradient
    //       id="Gradient"
    //       gradientUnits="userSpaceOnUse"
    //       x1="0"
    //       y1="0"
    //       x2="800"
    //       y2="0">
    //       <Stop offset="0" stopColor="white" stopOpacity="0" />
    //       <Stop offset="1" stopColor="white" stopOpacity="1" />
    //     </LinearGradient>
    //     <Mask
    //       id="Mask"
    //       maskUnits="userSpaceOnUse"
    //       x="0"
    //       y="0"
    //       width="800"
    //       height="300">
    //       <Rect x="0" y="0" width="800" height="300" fill="url(#Gradient)" />
    //     </Mask>
    //     <Circle
    //       cy={radius + 2}
    //       r={radius}
    //       fill={'rgba(91, 232, 235, .5)'}
    //       {...props}
    //       animatedProps={firstProps}
    //     />
    //   </Defs>

    //   <Circle
    //     cy={radius + 2}
    //     r={radius}
    //     mask="url(#Mask)"
    //     fill={'rgba(235, 91, 93, .5)'}
    //     {...props}
    //     animatedProps={secondProps}
    //   />
    // </Svg>
  );
};
