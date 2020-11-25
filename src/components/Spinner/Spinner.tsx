import React from 'react';
import * as RN from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateNode,
  interpolate,
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
  first: radius,
  second: radius * 3 + radius / 8,
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

  const x = {
    first: useSharedValue(initialPositions.first),
    second: useSharedValue(initialPositions.second),
  };

  const firstProps = useAnimatedProps(() => {
    return {
      cx: x.first.value,
    };
  });

  const secondProps = useAnimatedProps(() => {
    return {
      cx: x.second.value,
    };
  });

  const req = React.useCallback(() => {
    x.first.value = interpolate(
      Math.sin(currTime.value),
      [-1, 1],
      [initialPositions.first, initialPositions.second],
    );
    x.second.value = interpolate(
      Math.sin(currTime.value),
      [1, -1],
      [initialPositions.first, initialPositions.second],
    );
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
      style={{ backgroundColor: 'grey', alignSelf: 'center' }}>
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
