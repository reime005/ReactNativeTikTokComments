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
import Svg, { Circle as C } from 'react-native-svg';
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
    <Svg
      height={24}
      width={48}
      {...props}
      viewBox="0 0 48 24"
      style={{ backgroundColor: 'transparent', alignSelf: 'center' }}>
      <Circle
        cy={radius + 2}
        r={radius}
        fill={'rgba(91, 232, 235, .5)'}
        {...props}
        animatedProps={firstProps}
      />

      <Circle
        cy={radius + 2}
        r={radius}
        fill={'rgb(235, 91, 93, .5)'}
        {...props}
        animatedProps={secondProps}
      />
    </Svg>
  );
};
